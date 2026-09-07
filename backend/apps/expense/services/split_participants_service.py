from decimal import ROUND_HALF_UP, Decimal

from apps.expense.models import SplitParticipant, SplitType
from apps.group.models import GroupMembership


def split_participants_creation_service(
    group, expense_amount, split, split_type, expense
):

    participants = split.get("participants", [])
    shares = split.get("shares")

    if split_type == SplitType.EQUALLY:
        # call equal split service
        equal_split = equal_split_service(
            expense_amount=expense_amount,
            expense=expense,
            participants=participants,
            group=group,
        )

        return equal_split

    elif split_type == SplitType.AMOUNT:
        # call amount split service
        amount_split = amount_split_service(shares=shares, expense=expense)

        return amount_split

    elif split_type == SplitType.PERCENTAGE:
        # call percentage service
        percentage_split = percentage_split_service(
            shares=shares, expense_amount=expense_amount, expense=expense
        )

        return percentage_split


def equal_split_service(
    expense_amount,
    group,
    expense,
    participants=[],
):
    """
    Splits bill equally with the participants
    """

    total_participants = len(participants)

    # if participants are 0 then divide equally to all group members
    if total_participants == 0:
        group_members = GroupMembership.objects.filter(group=group)

        members_count = len(group_members)

        if members_count == 0:
            raise ValueError("Cannot split bill in group with no members.")

        # only store two digits after decimal 
        share_amount = (expense_amount / members_count).quantize(
            Decimal("0.01"), rounding=ROUND_HALF_UP
        )

        split_participants_payload = [
            SplitParticipant(
                user=member.user,
                expense=expense,
                amount=share_amount,
            )
            for member in group_members
        ]

    else:
        share_amount = expense_amount / total_participants

        split_participants_payload = [
            SplitParticipant(user=participant, expense=expense, amount=share_amount)
            for participant in participants
        ]

    # save to db
    split_participant_obj = SplitParticipant.objects.bulk_create(
        split_participants_payload
    )

    return split_participant_obj


def amount_split_service(shares, expense):
    """
    Splits bill based on provided exact amount.
    """
    split_participants_payload = [
        SplitParticipant(
            user=share.get("id"),
            expense=expense,
            amount=share.get("amount"),
        )
        for share in shares
    ]

    # save to db
    split_participant_obj = SplitParticipant.objects.bulk_create(
        split_participants_payload
    )

    return split_participant_obj


def percentage_split_service(shares, expense, expense_amount):
    """
    Splits bill based on percentage of share
    """
    split_participants_payload = [
        SplitParticipant(
            user=share.get("id"),
            expense=expense,
            amount=share.get("amount") / 100 * expense_amount,
        )
        for share in shares
    ]

    # save to db
    split_participant_obj = SplitParticipant.objects.bulk_create(
        split_participants_payload
    )

    return split_participant_obj
