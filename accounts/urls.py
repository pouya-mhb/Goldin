from django.urls import path

from .views import OpenAccountAPIView, ApproveAccountAPIView, RegisterAPIView

urlpatterns = [
    path(
        "open/",
        OpenAccountAPIView.as_view(),
    ),
    path(
        "open/<int:request_id>/approve/",
        ApproveAccountAPIView.as_view(),
    ),
    path(
        "register/",
        RegisterAPIView.as_view(),
    ),
]
