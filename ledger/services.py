from decimal import Decimal
from django.db import transaction

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


@transaction.atomic
def create_balanced_journal(description, entries):
    """
    entries = [

      {
        "account": acc1,
        "debit": 100
      },

      {
        "account": acc2,
        "credit": 100
      }

    ]
    """

    total_debit = Decimal("0")
    total_credit = Decimal("0")

    for entry in entries:

        total_debit += Decimal(str(entry.get("debit", 0)))

        total_credit += Decimal(str(entry.get("credit", 0)))

    if total_debit != total_credit:

        raise ValueError("Journal is not balanced")

    journal = Journal.objects.create(description=description)

    for entry in entries:

        JournalEntry.objects.create(
            journal=journal,
            account=entry["account"],
            debit=entry.get("debit", 0),
            credit=entry.get("credit", 0),
        )

    return journal
