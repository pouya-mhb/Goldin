from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User

from ledger.models import Account


@receiver(post_save, sender=User)
def create_accounts(sender, instance, created, **kwargs):

    if created:

        Account.objects.create(
            user=instance, name=f"{instance.phone} IRT", account_type="USER_IRT"
        )

        Account.objects.create(
            user=instance, name=f"{instance.phone} GOLD", account_type="USER_GOLD"
        )
