from django.contrib import admin

from .models import Account, Journal, JournalEntry

admin.site.register(Account)

admin.site.register(Journal)

admin.site.register(JournalEntry)
