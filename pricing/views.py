from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

from .services import get_current_price


class CurrentPriceAPIView(APIView):

    def get(self, request):

        price = get_current_price()

        return Response(
            {
                "buy_price": str(price.buy_price),
                "sell_price": str(price.sell_price),
            }
        )
