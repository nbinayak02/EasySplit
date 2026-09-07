from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView

from apps.finance.models import Settlement
from apps.finance.serializers import SettlementListByGroupSerializer
from apps.shared.response import APIResponse


class GroupSettlementListView(APIView):
    serializer_class = None

    @extend_schema(responses=SettlementListByGroupSerializer)
    def get(self, request, group_id):

        balances = Settlement.objects.filter(group_id=group_id).select_related(
            "paid_by", "paid_to"
        )

        serializer = SettlementListByGroupSerializer(balances, many=True)

        return APIResponse(message="Settlements fetched successfully", data=serializer.data)
