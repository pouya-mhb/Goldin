from decimal import Decimal

from .models import (
    Journal,
    JournalEntry,
)


def create_journal(description):

    return Journal.objects.create(description=description)


def create_entry(journal, account, debit=0, credit=0):

    return JournalEntry.objects.create(
        journal=journal, account=account, debit=debit, credit=credit
    )
