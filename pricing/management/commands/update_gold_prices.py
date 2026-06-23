from django.core.management.base import BaseCommand
from pricing.services import update_gold_prices


class Command(BaseCommand):
    help = "Update gold prices dynamically"

    def add_arguments(self, parser):
        parser.add_argument(
            "--interval", type=int, default=60, help="Update interval in minutes"
        )

    def handle(self, *args, **options):
        price = update_gold_prices()
        if price:
            self.stdout.write(
                self.style.SUCCESS(
                    f"✓ Gold price updated: Buy={price.buy_price}, Sell={price.sell_price}"
                )
            )
        else:
            self.stdout.write(self.style.ERROR("✗ Failed to update gold prices"))
