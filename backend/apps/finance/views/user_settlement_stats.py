from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView

from apps.finance.models import Settlement
from apps.finance.serializers import UserSettlementsStatsSerializer
from apps.shared.response import APIResponse


class UserSettlementStatsView(APIView):
    serializer_class = None

    @extend_schema (
            responses=UserSettlementsStatsSerializer
    )

    def get(self, request, user_id):

        settlements = Settlement.objects.filter(
            Q(paid_by_id=user_id) | Q(paid_to_id=user_id)
        ).select_related("paid_by", "paid_to", "group")

        serialized_settlements = UserSettlementsStatsSerializer(settlements, many=True)

        return APIResponse(
            data=serialized_settlements.data,
            message="User settlement statistics fetched successfullly",
        )
