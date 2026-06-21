from decimal import Decimal

from django.db import transaction

from pricing.services import get_current_price

from ledger.models import Account, AuditLog
from ledger.services import create_balanced_journal

from partners.services import reserve_gold, release_reserved_gold

from .models import Order
from wallets.models import Wallet, GoldWallet


@transaction.atomic
def buy_gold(user, grams, idempotency_key=None):

    grams = Decimal(str(grams))

    if grams <= 0:
        raise ValueError("Invalid grams")

    # LOCK wallet (anti race condition)
    wallet = Wallet.objects.select_for_update().get(user=user)
    gold_wallet = GoldWallet.objects.select_for_update().get(user=user)

    price = get_current_price()
    total_price = grams * price.buy_price

    if wallet.available_balance < total_price:
        raise ValueError("Insufficient balance")

    order = Order.objects.create(
        user=user,
        order_type=Order.BUY,
        grams=grams,
        unit_price=price.buy_price,
        total_price=total_price,
        status=Order.PROCESSING,
    )

    user_irt = Account.objects.get(user=user, account_type="USER_IRT")
    company_irt = Account.objects.get(account_type="COMPANY_IRT")

    user_gold = Account.objects.get(user=user, account_type="USER_GOLD")
    company_gold = Account.objects.get(account_type="COMPANY_GOLD")

    # CASH LEG
    create_balanced_journal(
        description=f"BUY CASH #{order.id}",
        entries=[
            {"account": company_irt, "debit": total_price},
            {"account": user_irt, "credit": total_price},
        ],
    )

    # GOLD LEG
    create_balanced_journal(
        description=f"BUY GOLD #{order.id}",
        entries=[
            {"account": user_gold, "debit": grams},
            {"account": company_gold, "credit": grams},
        ],
    )

    wallet.available_balance -= total_price
    wallet.save(update_fields=["available_balance"])

    gold_wallet.available_grams += grams
    gold_wallet.save(update_fields=["available_grams"])

    order.status = Order.COMPLETED
    order.save(update_fields=["status"])

    AuditLog.objects.create(
        user=user,
        action="BUY_GOLD",
        payload={
            "order_id": order.id,
            "grams": str(grams),
            "total_price": str(total_price),
        },
    )

    return order


@transaction.atomic
def sell_gold(user, grams):

    grams = Decimal(str(grams))

    if grams <= 0:
        raise ValueError("Invalid grams")

    wallet = Wallet.objects.select_for_update().get(user=user)
    gold_wallet = GoldWallet.objects.select_for_update().get(user=user)

    if gold_wallet.available_grams < grams:
        raise ValueError("Insufficient gold")

    # 🔥 RESERVE FROM VAULT (critical step)
    reserve_gold(grams)

    price = get_current_price()
    total_price = grams * price.sell_price

    order = Order.objects.create(
        user=user,
        order_type=Order.SELL,
        grams=grams,
        unit_price=price.sell_price,
        total_price=total_price,
        status=Order.PROCESSING,
    )

    user_irt = Account.objects.get(user=user, account_type="USER_IRT")
    company_irt = Account.objects.get(account_type="COMPANY_IRT")

    user_gold = Account.objects.get(user=user, account_type="USER_GOLD")
    company_gold = Account.objects.get(account_type="COMPANY_GOLD")

    try:
        # GOLD LEG
        create_balanced_journal(
            description=f"SELL GOLD #{order.id}",
            entries=[
                {"account": company_gold, "debit": grams},
                {"account": user_gold, "credit": grams},
            ],
        )

        # CASH LEG
        create_balanced_journal(
            description=f"SELL CASH #{order.id}",
            entries=[
                {"account": user_irt, "debit": total_price},
                {"account": company_irt, "credit": total_price},
            ],
        )

        gold_wallet.available_grams -= grams
        wallet.available_balance += total_price

        gold_wallet.save(update_fields=["available_grams"])
        wallet.save(update_fields=["available_balance"])

        order.status = Order.COMPLETED
        order.save(update_fields=["status"])

        AuditLog.objects.create(
            user=user,
            action="SELL_GOLD",
            payload={
                "order_id": order.id,
                "grams": str(grams),
                "total_price": str(total_price),
            },
        )

        return order

    except Exception as e:

        # rollback vault reserve
        release_reserved_gold(grams)

        order.status = Order.FAILED
        order.save(update_fields=["status"])

        raise e
