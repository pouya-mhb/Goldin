from decimal import Decimal

from django.db import transaction

from ledger.services import create_balanced_journal

from ledger.models import Account


@transaction.atomic
def deposit_money(user, amount):
    amount = Decimal(str(amount))

    wallet = user.wallet

    bank_account = Account.objects.get(account_type="BANK")

    user_account = Account.objects.get(user=user, account_type="USER_IRT")

    create_balanced_journal(
        description=f"Deposit {user.phone}",
        entries=[
            {"account": bank_account, "debit": amount},
            {"account": user_account, "credit": amount},
        ],
    )

    wallet.available_balance += amount

    wallet.save()

    return wallet
