# orders/urls.py

from django.urls import path

from .views import BuyGoldAPIView, SellGoldAPIView, OrderListAPIView

urlpatterns = [
    path("buy/", BuyGoldAPIView.as_view()),
    path("sell/", SellGoldAPIView.as_view()),
    path("history/", OrderListAPIView.as_view()),
]
