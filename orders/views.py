# orders/views.py

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BuyGoldSerializer, SellGoldSerializer

from .services import buy_gold, sell_gold

from .models import Order


class BuyGoldAPIView(APIView):

    def post(self, request):

        serializer = BuyGoldSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        order = buy_gold(user=request.user, grams=serializer.validated_data["grams"])

        return Response({"order_id": order.id, "status": order.status})


class SellGoldAPIView(APIView):

    def post(self, request):

        serializer = SellGoldSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        order = sell_gold(user=request.user, grams=serializer.validated_data["grams"])

        return Response({"order_id": order.id, "status": order.status})


class OrderListAPIView(APIView):

    def get(self, request):

        orders = Order.objects.filter(user=request.user).order_by("-created_at")

        return Response(
            [
                {
                    "id": o.id,
                    "type": o.order_type,
                    "grams": o.grams,
                    "total_price": o.total_price,
                    "status": o.status,
                    "created_at": o.created_at,
                }
                for o in orders
            ]
        )
