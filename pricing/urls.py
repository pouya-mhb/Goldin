from django.urls import path

from .views import CurrentPriceAPIView

urlpatterns = [
    path("current/", CurrentPriceAPIView.as_view(), name="current-price"),
]
