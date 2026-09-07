from django.db import transaction
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.models.settlement import Settlement
from apps.finance.serializers import (
    SettlementListByGroupSerializer,
    SettlementSerializer,
    SettlementUpdatePaidToSerializer,
)
from apps.finance.services import (
    balance_update_after_settlement_delete,
    balance_update_after_settlement_update,
)
from apps.shared.response import APIResponse


class SettlementDetailView(APIView):
    serializer_class = None

    def get_settlement(self, id: int) -> Settlement:
        try:
            settlement = Settlement.objects.get(pk=id)
            return settlement
        except Settlement.DoesNotExist:
            return APIResponse(
                success=False,
                message="Settlement not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

    def get(self, request, id):

        try:
            # methods like get, exists, first, last, count execute immediately so we use methods like
            # select related, filter etc at first.
            settlement = Settlement.objects.select_related("paid_to", "paid_by").get(
                pk=id
            )
            serializer = SettlementListByGroupSerializer(settlement)
            return APIResponse(
                message="Settlement fetched successfully", data=serializer.data
            )
        except Settlement.DoesNotExist:
            return APIResponse(
                success=False,
                message="Settlement not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

    @extend_schema(
        request=SettlementUpdatePaidToSerializer, responses=SettlementSerializer
    )
    @transaction.atomic
    def patch(self, request, id):

        old_settlement = self.get_settlement(id)

        # pass object as positional arg for update
        serializer = SettlementUpdatePaidToSerializer(old_settlement, data=request.data)

        serializer.is_valid(raise_exception=True)

        new_settlement = serializer.save()

        # Update balance
        balance_update_after_settlement_update(old_settlement, new_settlement)

        old_settlement_serialized = SettlementSerializer(old_settlement)
        new_settlement_serialized = SettlementSerializer(new_settlement)

        create_activity(
            user_id=request.user.id,
            group_id=old_settlement.group.id,
            module=ModulesType.SETTLEMENT,
            action=ActionType.UPDATE,
            details={
                "previous": old_settlement_serialized.data,
                "current": new_settlement_serialized.data,
            },
        )

        return APIResponse(message="Settlement Successful.", data=serializer.data)

    @transaction.atomic
    def delete(self, request, id):

        settlement = self.get_settlement(id)

        settlement.delete()

        balance_update_after_settlement_delete(settlement)

        create_activity(
            user_id=request.user.id,
            group_id=settlement.group_id,
            module=ModulesType.SETTLEMENT,
            action=ActionType.DELETE,
        )

        return APIResponse(
            message="Settlement deleted successfully.",
            status_code=status.HTTP_204_NO_CONTENT,
        )
