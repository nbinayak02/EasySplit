from apps.expense.models import Expense, SplitParticipant
from apps.expense.serializer.expense_serializer import ExpenseSerializer
from apps.expense.serializer.initial_payment_serializer import (
    InitialPaymentSerializer,
)
from apps.expense.serializer.split_participants_serializer import (
    SplitParticipantsSerializer,
)
from apps.finance.models import InitialPayment
from apps.finance.models.balance import Balance
from apps.finance.services import (
    balance_update_service,
    calculate_balance_service,
    initial_payment_creation_service,
)

from .split_participants_service import split_participants_creation_service


def expense_creation_service(valid_data):
    """
    Service responsible for creating expense, splitting bill and saving payer data. Also updates balance of each participating user.
    """
    # extract payers
    payers = valid_data.pop("payers")

    # extract split
    split = valid_data.pop("split")

    # get split type
    split_type = split.get("type")

    group = valid_data.get("group")
    expense_amount = valid_data.get("amount")

    # Create expense

    # After popping up payers and split valid_data will contain only valid expense fields except split_type because we had sent it on split
    expense_obj = Expense.objects.create(split_type=split_type, **valid_data)

    initial_payment = initial_payment_creation_service(
        expense=expense_obj, payers=payers
    )

    split_participants = split_participants_creation_service(
        group=group,
        expense=expense_obj,
        expense_amount=expense_amount,
        split_type=split_type,
        split=split,
    )

    balance_update_service(initial_payment, split_participants, group_id=group.id)

    expense_serializer = ExpenseSerializer(expense_obj)

    initial_payment_serializer = InitialPaymentSerializer(initial_payment, many=True)

    split_participants_serializer = SplitParticipantsSerializer(
        split_participants, many=True
    )

    payload = expense_serializer.data
    payload["initial_payment"] = initial_payment_serializer.data
    payload["split_participants"] = split_participants_serializer.data

    return payload


def expense_deletion_service(expense):
    """
    Deletes expense and related data - split participants and initial payment. Also updates the balance.
    """

    # get required data
    initial_payment = InitialPayment.objects.filter(expense=expense)
    split_participant = SplitParticipant.objects.filter(expense=expense)

    # calculate balance made by this expense
    expense_balance = calculate_balance_service(
        initial_payment=initial_payment,
        split_participants=split_participant,
    )

    # prepare a list of user ids
    participants_ids = [participant.user_id for participant in split_participant]

    # fetch existing balance
    balances = Balance.objects.filter(user_id__in=participants_ids, group=expense.group)

    # subtract the balance made by this expense
    for existing_balance in balances:
        existing_balance.balance -= expense_balance.get(existing_balance.user_id)

    # bulk update
    Balance.objects.bulk_update(balances, ["balance"])

    # delete expense
    expense.delete()
