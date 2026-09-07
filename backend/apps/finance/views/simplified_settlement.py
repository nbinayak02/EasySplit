import heapq

from rest_framework.views import APIView

from apps.finance.models import Balance
from apps.finance.services import calculate_simplified_settlement
from apps.shared.response import APIResponse


class SimplifiedSettlementView(APIView):
    serializer_class = None

    def get(self, request, group_id):

        users_balance = Balance.objects.filter(group_id=group_id).select_related("user")

        creditors_max_heap = []
        debitors_min_heap = []

        # make heap
        for user_balance in users_balance:
            if user_balance.balance > 0:
                # store in creditors max heap
                heapq.heappush_max(
                    creditors_max_heap,
                    (user_balance.balance, user_balance.id, user_balance),
                )

            elif user_balance.balance < 0:
                # store in debitors min heap
                heapq.heappush(
                    debitors_min_heap,
                    (user_balance.balance, user_balance.id, user_balance),
                )

        # calculate transactions
        transactions = calculate_simplified_settlement(
            creditors_max_heap, debitors_min_heap
        )

        return APIResponse(
            message="Simplified settlement fetched successfully", data=transactions
        )
