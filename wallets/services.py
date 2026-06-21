# wallets/services.py

from django.db import transaction


@transaction.atomic
def reserve_gold(wallet, grams):
    """
    Lock gold before selling
    """
    if wallet.available_gold < grams:
        raise ValueError("Insufficient gold")

    wallet.available_gold -= grams
    wallet.locked_gold += grams
    wallet.save()


@transaction.atomic
def release_reserved_gold(wallet, grams):
    """
    Unlock gold if transaction fails
    """
    wallet.locked_gold -= grams
    wallet.available_gold += grams
    wallet.save()


@transaction.atomic
def confirm_gold_sale(wallet, grams):
    """
    Finalize sale: remove locked gold permanently
    """
    wallet.locked_gold -= grams
    wallet.save()
