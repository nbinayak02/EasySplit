from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView

from apps.finance.models import Balance
from apps.finance.serializers import BalanceListByGroupSerializer
from apps.shared.response import APIResponse


class GroupBalanceListView(APIView):
    serializer_class = None

    @extend_schema(responses=BalanceListByGroupSerializer)
    def get(self, request, group_id):

        balances = Balance.objects.filter(group_id=group_id).select_related("user")

        serializer = BalanceListByGroupSerializer(balances, many=True)

        return APIResponse(message="Balance fetched successfully", data=serializer.data)
