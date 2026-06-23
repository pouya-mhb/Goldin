from django.urls import path

from .views import CurrentPriceAPIView, PriceHistoryAPIView

urlpatterns = [
    path("current/", CurrentPriceAPIView.as_view(), name="current-price"),
    path("history/", PriceHistoryAPIView.as_view(), name="price-history"),
]
