from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from apps.shared.response import APIResponse

from .models import HealthModel
from .serializers import HealthSerializer


class HealthView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        data = HealthModel.objects.all()

        serializer = HealthSerializer(data, many=True)

        return APIResponse(message="EasySplit is healthy", data=serializer.data)
