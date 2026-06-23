import os
from django.apps import AppConfig
from django.conf import settings


class PricingConfig(AppConfig):
    name = "pricing"

    def ready(self):
        # Start the scheduler only in the actual runserver or long-running process.
        # Avoid scheduling jobs during migrations, tests, or management commands.
        should_start = (
            settings.SCHEDULE_GOLD_PRICE_UPDATES
            and os.environ.get("RUN_MAIN") == "true"
        )
        if should_start:
            from .scheduler import start_gold_price_scheduler

            start_gold_price_scheduler()
