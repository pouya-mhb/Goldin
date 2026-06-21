# wallets/views.py

from rest_framework.views import APIView
from rest_framework.response import Response


class WalletAPIView(APIView):

    def get(self, request):

        wallet = request.user.wallet
        gold_wallet = request.user.gold_wallet

        return Response(
            {
                "irt_balance": wallet.available_balance,
                "irt_locked": wallet.locked_balance,
                "gold_balance": gold_wallet.available_grams,
                "gold_locked": gold_wallet.locked_grams,
            }
        )
