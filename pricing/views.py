from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

from .services import get_current_price
from .models import GoldPrice


class CurrentPriceAPIView(APIView):

    def get(self, request):

        price = get_current_price()

        return Response(
            {
                "buy_price": str(price.buy_price),
                "sell_price": str(price.sell_price),
            }
        )


class PriceHistoryAPIView(APIView):

    def get(self, request):

        days = int(request.query_params.get("days", 30))

        start_date = timezone.now() - timedelta(days=days)

        prices = GoldPrice.objects.filter(created_at__gte=start_date).order_by(
            "created_at"
        )

        return Response(
            [
                {
                    "timestamp": p.created_at.isoformat(),
                    "buy_price": str(p.buy_price),
                    "sell_price": str(p.sell_price),
                }
                for p in prices
            ]
        )
