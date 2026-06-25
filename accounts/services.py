from django.db import transaction
from django.utils import timezone

from wallets.models import Wallet
from ledger.models import Account

from .models import AccountOpeningRequest


@transaction.atomic
def open_financial_accounts(user):

    Wallet.objects.get_or_create(user=user)

    Account.objects.get_or_create(
        user=user,
        account_type="USER_IRT",
        defaults={
            "name": f"{user.phone} IRT",
            "currency": "IRT",
        },
    )

    Account.objects.get_or_create(
        user=user,
        account_type="USER_GOLD",
        defaults={
            "name": f"{user.phone} GOLD",
            "currency": "GOLD",
        },
    )


@transaction.atomic
def approve_account_opening(request_id):

    request = AccountOpeningRequest.objects.select_for_update().get(id=request_id)

    # همیشه بررسی کن حساب‌ها ساخته شده باشند
    open_financial_accounts(request.user)

    if request.status != AccountOpeningRequest.APPROVED:

        request.status = AccountOpeningRequest.APPROVED

        request.reviewed_at = timezone.now()

        request.save(
            update_fields=[
                "status",
                "reviewed_at",
            ]
        )

    return request
