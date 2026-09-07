from django.db import transaction
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.serializers import SettlementSerializer
from apps.finance.services import balance_update_after_settlement_created
from apps.shared.response import APIResponse


class CreateSettlementView(APIView):
    serializer_class = SettlementSerializer

    @transaction.atomic
    def post(self, request):

        data = request.data.copy()

        data["paid_by"] = request.user.id

        serializer = SettlementSerializer(data=data)

        serializer.is_valid(raise_exception=True)

        settlement = serializer.save()

        # Update balance
        balance_update_after_settlement_created(settlement)

        group = serializer.validated_data.get("group")

        create_activity(
            user_id=request.user.id,
            group_id=group.id,
            module=ModulesType.SETTLEMENT,
            action=ActionType.CREATE,
            details={"amount": serializer.data.get("amount")},
        )

        return APIResponse(message="Settlement Successful.", data=serializer.data)
