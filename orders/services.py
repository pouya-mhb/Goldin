from decimal import Decimal

from django.db import transaction

from pricing.services import get_current_price

from ledger.models import Account

from ledger.services import create_balanced_journal

from .models import Order


@transaction.atomic
def buy_gold(user, grams):
    grams = Decimal(str(grams))

    price = get_current_price()

    total_price = grams * price.buy_price

    wallet = user.wallet

    if wallet.available_balance < total_price:

        raise ValueError("Insufficient balance")

    order = Order.objects.create(
        user=user,
        order_type="BUY",
        grams=grams,
        unit_price=price.buy_price,
        total_price=total_price,
    )

    user_irt = Account.objects.get(user=user, account_type="USER_IRT")

    company_irt = Account.objects.get(account_type="COMPANY_IRT")

    create_balanced_journal(
        description=f"Buy Gold #{order.id}",
        entries=[
            {"account": company_irt, "debit": total_price},
            {"account": user_irt, "credit": total_price},
        ],
    )

    wallet.available_balance -= total_price

    wallet.save()

    gold_wallet = user.gold_wallet

    gold_wallet.available_grams += grams

    gold_wallet.save()

    order.status = "COMPLETED"

    order.save()

    return order
