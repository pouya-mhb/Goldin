from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class WalletAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        wallet = request.user.wallet

        return Response(
            {
                "irt_balance": wallet.available_balance,
                "irt_locked": wallet.locked_balance,
                "gold_balance": wallet.available_gold,
                "gold_locked": wallet.locked_gold,
            }
        )
