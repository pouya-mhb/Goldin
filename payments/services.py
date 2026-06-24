from decimal import Decimal

from django.db import transaction

from wallets.models import Wallet

from ledger.models import Account
from ledger.services import create_balanced_journal

from .models import Deposit, Withdrawal


@transaction.atomic
def complete_deposit(deposit_id):

    deposit = Deposit.objects.select_for_update().get(id=deposit_id)

    if deposit.status == Deposit.SUCCESS:
        return deposit

    amount = Decimal(str(deposit.amount))

    wallet, _ = Wallet.objects.get_or_create(user=deposit.user)

    wallet.available_balance += amount

    wallet.save(update_fields=["available_balance"])

    deposit.status = Deposit.SUCCESS

    deposit.save(update_fields=["status"])

    return deposit


@transaction.atomic
def complete_withdrawal(withdrawal_id):

    withdrawal = Withdrawal.objects.select_for_update().get(id=withdrawal_id)

    if withdrawal.status == Withdrawal.COMPLETED:
        return withdrawal

    amount = Decimal(str(withdrawal.amount))

    wallet = Wallet.objects.select_for_update().get(user=withdrawal.user)

    if wallet.available_balance < amount:
        raise ValueError("Insufficient balance")

    user_account, _ = Account.objects.get_or_create(
        user=withdrawal.user,
        account_type="USER_IRT",
        defaults={
            "name": f"{withdrawal.user.phone} IRT",
            "currency": "IRT",
        },
    )

    bank_account, _ = Account.objects.get_or_create(
        account_type="BANK",
        defaults={
            "name": "Main Bank",
            "currency": "IRT",
        },
    )
    create_balanced_journal(
        description=f"WITHDRAWAL #{withdrawal.id}",
        entries=[
            {
                "account": user_account,
                "debit": amount,
            },
            {
                "account": bank_account,
                "credit": amount,
            },
        ],
    )

    wallet.available_balance -= amount

    wallet.save(update_fields=["available_balance"])

    withdrawal.status = Withdrawal.COMPLETED

    withdrawal.save(update_fields=["status"])

    return withdrawal
