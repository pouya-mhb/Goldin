from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from .serializers import ProfileSerializer


class ProfileAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = ProfileSerializer(request.user.profile)

        return Response(serializer.data)

    def put(self, request):

        serializer = ProfileSerializer(
            request.user.profile, data=request.data, partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)
