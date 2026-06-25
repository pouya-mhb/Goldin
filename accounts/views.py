from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from profiles.models import Profile

from .models import AccountOpeningRequest, User
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .services import (
    approve_account_opening,
)

from .serializers import (
    RegisterSerializer,
)


class RegisterAPIView(CreateAPIView):

    permission_classes = [AllowAny]

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


class OpenAccountAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            profile = request.user.profile

        except Profile.DoesNotExist:

            return Response(
                {"error": "Complete profile first"},
                status=400,
            )

        account_request, _ = AccountOpeningRequest.objects.get_or_create(
            user=request.user
        )

        return Response(
            {
                "request_id": account_request.id,
                "status": account_request.status,
            }
        )


class ApproveAccountAPIView(APIView):

    def post(
        self,
        request,
        request_id,
    ):

        account_request = approve_account_opening(request_id)

        return Response({"status": account_request.status})
