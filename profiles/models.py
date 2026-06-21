from django.db import models
from django.conf import settings


class Profile(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )

    first_name = models.CharField(max_length=100, blank=True)

    last_name = models.CharField(max_length=100, blank=True)

    national_code = models.CharField(max_length=10, blank=True)

    birth_date = models.DateField(null=True, blank=True)

    address = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.phone}"
