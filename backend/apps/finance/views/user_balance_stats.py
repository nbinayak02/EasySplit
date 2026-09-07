from django.db.models import Count, Q, Sum
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView

from apps.finance.models import Balance
from apps.finance.serializers import UserBalanceStatsSerializer
from apps.shared.response import APIResponse


class UserBalanceStatsView(APIView):
    serializer_class = None

    @extend_schema(responses=UserBalanceStatsSerializer)
    def get(self, request, user_id):

        balance = Balance.objects.filter(user_id=user_id).aggregate(
            total_groups=Count("group"),
            total_positive=Sum("balance", filter=Q(balance__gt=0)),
            total_negative=Sum(
                "balance", filter=Q(balance__lt=0)
            ),  # method like sum expect condition object Q in their filter
        )

        serialized_balance = UserBalanceStatsSerializer(balance)

        return APIResponse(
            data=serialized_balance.data,
            message="User balance statistics fetched successfullly",
        )
