from rest_framework import serializers

from .models import AccountOpeningRequest, User


class AccountOpeningRequestSerializer(serializers.ModelSerializer):

    class Meta:

        model = AccountOpeningRequest

        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:

        model = User

        fields = [
            "phone",
            "password",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            phone=validated_data["phone"],
            password=validated_data["password"],
        )

        return user
