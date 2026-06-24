from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Deposit, Withdrawal, BankAccount
from .services import (
    complete_deposit,
    complete_withdrawal,
)

from .serializers import (
    DepositSerializer,
    WithdrawalSerializer,
)


class CreateDepositAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = Decimal(request.data["amount"])

        deposit = Deposit.objects.create(
            user=request.user,
            amount=amount,
        )

        # simulate successful gateway callback
        deposit = complete_deposit(deposit.id)

        return Response(
            {
                "deposit_id": deposit.id,
                "status": deposit.status,
            }
        )


class DepositCallbackAPIView(APIView):

    def post(self, request, deposit_id):

        deposit = complete_deposit(deposit_id)

        return Response(
            {
                "deposit_id": deposit.id,
                "status": deposit.status,
            }
        )


class CreateWithdrawalAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = Decimal(request.data["amount"])
        bank_account_id = request.data["bank_account_id"]

        try:
            bank_account = BankAccount.objects.get(
                id=bank_account_id,
                user=request.user,
            )

        except BankAccount.DoesNotExist:

            return Response(
                {"error": "Bank account not found"},
                status=404,
            )

        withdrawal = Withdrawal.objects.create(
            user=request.user,
            bank_account=bank_account,
            amount=amount,
            status=Withdrawal.PENDING,
        )

        # simulate admin approval
        withdrawal = complete_withdrawal(withdrawal.id)

        return Response(
            {
                "withdrawal_id": withdrawal.id,
                "status": withdrawal.status,
            }
        )


class CompleteWithdrawalAPIView(APIView):

    def post(self, request, withdrawal_id):

        withdrawal = complete_withdrawal(withdrawal_id)

        return Response(
            {
                "withdrawal_id": withdrawal.id,
                "status": withdrawal.status,
            }
        )


class DepositListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        deposits = Deposit.objects.filter(user=request.user).order_by("-created_at")

        serializer = DepositSerializer(
            deposits,
            many=True,
        )

        return Response(serializer.data)


class WithdrawalListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        withdrawals = (
            Withdrawal.objects.filter(user=request.user)
            .select_related("bank_account")
            .order_by("-created_at")
        )

        serializer = WithdrawalSerializer(
            withdrawals,
            many=True,
        )

        return Response(serializer.data)
