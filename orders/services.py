from decimal import Decimal

from django.db import transaction

from pricing.services import get_current_price

from ledger.models import Account

from ledger.services import create_balanced_journal

from .models import Order


@transaction.atomic
def buy_gold(user, grams):
    """
    Buy gold using user IRT balance
    """

    grams = Decimal(str(grams))

    if grams <= 0:
        raise ValueError("Grams must be greater than zero")

    price = get_current_price()

    total_price = grams * price.buy_price

    wallet = user.wallet

    if wallet.available_balance < total_price:
        raise ValueError("Insufficient balance")

    order = Order.objects.create(
        user=user,
        order_type=Order.BUY,
        grams=grams,
        unit_price=price.buy_price,
        total_price=total_price,
        status=Order.PENDING,
    )

    user_irt = Account.objects.get(user=user, account_type="USER_IRT")

    company_irt = Account.objects.get(account_type="COMPANY_IRT")

    user_gold = Account.objects.get(user=user, account_type="USER_GOLD")

    company_gold = Account.objects.get(account_type="COMPANY_GOLD")

    create_balanced_journal(
        description=f"BUY CASH #{order.id}",
        entries=[
            {"account": company_irt, "debit": total_price},
            {"account": user_irt, "credit": total_price},
        ],
    )

    create_balanced_journal(
        description=f"BUY GOLD #{order.id}",
        entries=[
            {"account": user_gold, "debit": grams},
            {"account": company_gold, "credit": grams},
        ],
    )

    wallet.available_balance -= total_price

    wallet.save(update_fields=["available_balance"])

    gold_wallet = user.gold_wallet

    gold_wallet.available_grams += grams

    gold_wallet.save(update_fields=["available_grams"])

    order.status = Order.COMPLETED

    order.save(update_fields=["status"])

    return order


@transaction.atomic
def sell_gold(user, grams):
    """
    Sell gold and receive IRT
    """

    grams = Decimal(str(grams))

    if grams <= 0:
        raise ValueError("Grams must be greater than zero")

    gold_wallet = user.gold_wallet

    if gold_wallet.available_grams < grams:
        raise ValueError("Insufficient gold balance")

    price = get_current_price()

    total_price = grams * price.sell_price

    order = Order.objects.create(
        user=user,
        order_type=Order.SELL,
        grams=grams,
        unit_price=price.sell_price,
        total_price=total_price,
        status=Order.PENDING,
    )

    user_irt = Account.objects.get(user=user, account_type="USER_IRT")

    company_irt = Account.objects.get(account_type="COMPANY_IRT")

    user_gold = Account.objects.get(user=user, account_type="USER_GOLD")

    company_gold = Account.objects.get(account_type="COMPANY_GOLD")

    create_balanced_journal(
        description=f"SELL GOLD #{order.id}",
        entries=[
            {"account": company_gold, "debit": grams},
            {"account": user_gold, "credit": grams},
        ],
    )

    create_balanced_journal(
        description=f"SELL CASH #{order.id}",
        entries=[
            {"account": user_irt, "debit": total_price},
            {"account": company_irt, "credit": total_price},
        ],
    )

    gold_wallet.available_grams -= grams

    gold_wallet.save(update_fields=["available_grams"])

    wallet = user.wallet

    wallet.available_balance += total_price

    wallet.save(update_fields=["available_balance"])

    order.status = Order.COMPLETED

    order.save(update_fields=["status"])

    return order
