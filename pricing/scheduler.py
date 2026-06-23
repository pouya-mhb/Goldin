import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django.conf import settings
from django.utils import timezone
from .services import update_gold_prices

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE)


def _update_prices_job():
    logger.info("Scheduling gold price update job")
    update_gold_prices()


def start_gold_price_scheduler():
    if scheduler.get_job("update_gold_prices") is not None:
        return

    scheduler.add_job(
        _update_prices_job,
        trigger=CronTrigger(minute="0"),
        id="update_gold_prices",
        replace_existing=True,
        misfire_grace_time=300,
    )
    scheduler.start()
    logger.info("Gold price scheduler started (hourly)")
