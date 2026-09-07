from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from apps.shared.response import APIResponse


class VerifyView(APIView):
    serializer_class = None

    def get(self, request):

        data = {"id": request.user.id, "name": request.user.first_name}

        return APIResponse(data=data, status_code=HTTP_200_OK)
