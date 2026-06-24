from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):

    phone = models.CharField(max_length=20, unique=True)

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "phone"

    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.phone


class Meta:

    constraints = [
        models.UniqueConstraint(
            fields=["account_type"],
            condition=models.Q(user__isnull=True),
            name="unique_system_account_type",
        ),
        models.UniqueConstraint(
            fields=["user", "account_type"], name="unique_user_account_type"
        ),
    ]
