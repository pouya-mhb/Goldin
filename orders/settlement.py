from django.db import transaction

from .models import Order

from partners.services import reserve_gold, release_reserved_gold

from ledger.services import create_balanced_journal
from ledger.models import Account

# core settelment


@transaction.atomic
def settle_sell_order(order_id):
    order = Order.objects.select_for_update().get(id=order_id)

    if order.status != Order.PENDING:
        raise ValueError("Invalid order state")

    # status change
    order.status = Order.PROCESSING
    order.save()

    # gold reservation
    reserve_gold(order.grams)

    # gold ledger
    user_gold = Account.objects.get(user=order.user, account_type="USER_GOLD")

    company_gold = Account.objects.get(account_type="COMPANY_GOLD")

    create_balanced_journal(
        description=f"SETTLE GOLD SELL #{order.id}",
        entries=[
            {"account": company_gold, "debit": order.grams},
            {"account": user_gold, "credit": order.grams},
        ],
    )

    # irt ledger
    user_irt = Account.objects.get(user=order.user, account_type="USER_IRT")

    company_irt = Account.objects.get(account_type="COMPANY_IRT")

    create_balanced_journal(
        description=f"SETTLE CASH SELL #{order.id}",
        entries=[
            {"account": user_irt, "debit": order.total_price},
            {"account": company_irt, "credit": order.total_price},
        ],
    )

    # wallet update
    wallet = order.user.wallet

    wallet.available_balance += order.total_price
    wallet.save()

    gold_wallet = order.user.wallet.available_gold

    gold_wallet.available_grams -= order.grams
    gold_wallet.save()

    # complete order status
    order.status = Order.COMPLETED
    order.save()

    try:

        reserve_gold(order.grams)

        # ledger + wallet steps

        order.status = Order.COMPLETED
        order.save()

    except Exception as e:

        release_reserved_gold(order.grams)

        order.status = Order.FAILED
        order.save()

        raise e
