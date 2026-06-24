from rest_framework import serializers

from .models import Deposit, Withdrawal


class DepositSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deposit

        fields = [
            "id",
            "amount",
            "status",
            "created_at",
        ]


class DepositSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deposit
        fields = [
            "id",
            "amount",
            "status",
            "created_at",
        ]


class WithdrawalSerializer(serializers.ModelSerializer):

    bank_name = serializers.CharField(source="bank_account.bank_name", read_only=True)

    class Meta:
        model = Withdrawal
        fields = [
            "id",
            "amount",
            "status",
            "bank_name",
            "created_at",
        ]
