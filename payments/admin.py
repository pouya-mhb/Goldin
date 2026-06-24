from django.contrib import admin
from .models import BankAccount, Deposit, User, Withdrawal

admin.site.register(User)
admin.site.register(BankAccount)
admin.site.register(Deposit)
admin.site.register(Withdrawal)
