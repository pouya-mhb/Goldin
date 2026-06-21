from django.db import models
from decimal import Decimal
from django.conf import settings


class Account(models.Model):

    ACCOUNT_TYPES = [
        ("USER_IRT", "User IRT"),
        ("USER_GOLD", "User Gold"),
        ("COMPANY_IRT", "Company IRT"),
        ("COMPANY_GOLD", "Company Gold"),
        ("BANK", "Bank"),
        ("VAULT", "Vault"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)

    account_type = models.CharField(max_length=50, choices=ACCOUNT_TYPES)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Journal(models.Model):

    description = models.TextField()

    reference_id = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_balanced(self):

        debit_total = Decimal("0")

        credit_total = Decimal("0")

        for entry in self.entries.all():

            debit_total += entry.debit

            credit_total += entry.credit

        return debit_total == credit_total


class JournalEntry(models.Model):

    journal = models.ForeignKey(
        Journal, on_delete=models.CASCADE, related_name="entries"
    )

    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    debit = models.DecimalField(max_digits=18, decimal_places=2, default=0)

    credit = models.DecimalField(max_digits=18, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
