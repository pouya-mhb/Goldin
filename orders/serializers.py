# orders/serializers.py

from rest_framework import serializers


class BuyGoldSerializer(serializers.Serializer):
    grams = serializers.DecimalField(max_digits=18, decimal_places=4)


class SellGoldSerializer(serializers.Serializer):
    grams = serializers.DecimalField(max_digits=18, decimal_places=4)
