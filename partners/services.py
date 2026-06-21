from django.db import transaction

from .models import PartnerInventory


@transaction.atomic
def reserve_gold(grams):
    """
    Reserve gold from vault before selling to user
    """

    inventory = PartnerInventory.objects.select_for_update().first()

    if inventory.available_grams < grams:

        raise ValueError("Insufficient vault gold")

    inventory.available_grams -= grams

    inventory.reserved_grams += grams

    inventory.save()

    return inventory


def release_reserved_gold(grams):
    inventory = PartnerInventory.objects.first()

    inventory.reserved_grams -= grams

    inventory.save()

    return inventory
