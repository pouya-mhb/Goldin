from django.urls import path
from .views import (
    CreateDepositAPIView,
    DepositCallbackAPIView,
    CreateWithdrawalAPIView,
    CompleteWithdrawalAPIView,
    DepositListAPIView,
    WithdrawalListAPIView,
)

urlpatterns = [
    path("deposit/", CreateDepositAPIView.as_view()),
    path("deposit/callback/<int:deposit_id>/", DepositCallbackAPIView.as_view()),
    path("withdraw/", CreateWithdrawalAPIView.as_view()),
    path("withdraw/complete/<int:withdrawal_id>/", CompleteWithdrawalAPIView.as_view()),
    path(
        "deposits/",
        DepositListAPIView.as_view(),
    ),
    path("withdrawals/", WithdrawalListAPIView.as_view()),
]
