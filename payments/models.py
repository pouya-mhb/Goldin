from django.db import models
from accounts.models import User


class BankAccount(models.Model):

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="bank_accounts"
    )

    bank_name = models.CharField(max_length=100)
    iban = models.CharField(max_length=50)
    card_number = models.CharField(max_length=20)
    owner_name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.phone} - {self.bank_name}"


class Deposit(models.Model):

    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (SUCCESS, "Success"),
        (FAILED, "Failed"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=18, decimal_places=2)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    created_at = models.DateTimeField(auto_now_add=True)


class Withdrawal(models.Model):

    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    REJECTED = "REJECTED"

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (PROCESSING, "Processing"),
        (COMPLETED, "Completed"),
        (REJECTED, "Rejected"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bank_account = models.ForeignKey(BankAccount, on_delete=models.PROTECT)

    amount = models.DecimalField(max_digits=18, decimal_places=2)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
