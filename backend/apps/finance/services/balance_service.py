from apps.finance.models import Balance, Settlement


def balance_update_service(initial_payment, split_participants, group_id):
    """
    Updates a balance for the users who are on split_participant.
    """

    # Calculate balance
    balance_list = calculate_balance_service(initial_payment, split_participants)

    print("Balance List: ", balance_list)

    # List of participant user id
    user_ids = [participant.user_id for participant in split_participants]

    # Fetch existing balance for all participants
    participants_existing_balance = Balance.objects.filter(
        user_id__in=user_ids, group_id=group_id
    )

    # Increment balance with new balance
    for existing_balance in participants_existing_balance:
        existing_balance.balance += balance_list.get(existing_balance.user_id)

    # Bulk update
    Balance.objects.bulk_update(participants_existing_balance, ["balance"])


def calculate_balance_service(initial_payment, split_participants):
    """
    Calculates balance of each split participants for current expense. Returns [{user_id: balance}]
    """

    new_balances = {}

    for participant in split_participants:
        initial_payment_amount = next(
            (
                payment.amount
                for payment in initial_payment
                if payment.paid_by_id == participant.user_id
            ),
            0,
        )

        balance = initial_payment_amount - participant.amount

        new_balances[participant.user_id] = balance

    return new_balances


def balance_update_after_settlement_created(settlement: Settlement):
    """
    Updates balance after settlement is created
    """

    payer = settlement.paid_by_id
    receiver = settlement.paid_to_id

    user_balance_objects = Balance.objects.filter(user__in=[payer, receiver])

    for balance_object in user_balance_objects:
        if balance_object.user_id == payer:
            balance_object.balance += settlement.amount
            # payer balance will be on -ve so add to reduce

        elif balance_object.user_id == receiver:
            balance_object.balance -= settlement.amount
            # receiver balance will be on +ve so subtract it to reduce

    Balance.objects.bulk_update(user_balance_objects, ["balance"])


def balance_update_after_settlement_update(
    old_settlement: Settlement, new_settlement: Settlement
):
    """
    Updates balance after settlement is updated
    """

    payer = old_settlement.paid_by_id

    old_receiver = old_settlement.paid_to_id
    new_receiver = new_settlement.paid_to_id

    old_paid_amount = old_settlement.amount
    new_paid_amount = new_settlement.amount

    receiver_changed = old_receiver != new_receiver
    amount_changed = old_paid_amount != new_paid_amount

    user_balance_objects = Balance.objects.filter(
        user__in=[payer, old_receiver, new_receiver]
    )

    if receiver_changed and amount_changed:
        for balance_object in user_balance_objects:
            # add old amount back to old receiver
            if balance_object.user_id == old_receiver:
                balance_object.amount += old_paid_amount

            elif balance_object.user_id == new_receiver:
                balance_object.amount -= new_paid_amount

            elif balance_object.user_id == payer:
                balance_object -= old_paid_amount
                balance_object += new_paid_amount

    # only payer has changed
    elif receiver_changed:
        # amount is same so we can take any

        for balance_object in user_balance_objects:
            # add amount back to old receiver
            if balance_object.user_id == old_receiver:
                balance_object.amount += old_paid_amount

            # reduce amount from new receiver
            elif balance_object.user_id == new_receiver:
                balance_object.amount -= old_paid_amount

    # only amount has been changed
    elif amount_changed:
        # paid_to is same so we can take any

        for balance_object in user_balance_objects:
            # add old amount back to receiver and reduce new amount

            if balance_object.user_id == old_receiver:
                balance_object.amount += old_paid_amount
                balance_object.amount -= new_paid_amount

            elif balance_object.user_id == payer:
                balance_object.amount -= old_paid_amount
                balance_object.amount += new_paid_amount

    Balance.objects.bulk_update(user_balance_objects, ["balance"])


def balance_update_after_settlement_delete(settlement: Settlement):
    """
    Updates balance after settlement is deleted
    """

    payer = settlement.paid_by_id
    receiver = settlement.paid_to_id

    user_balance_objects = Balance.objects.filter(user__in=[payer, receiver])

    for balance_object in user_balance_objects:
        # restore back the payer balance
        if balance_object.user_id == payer:
            balance_object.balance -= settlement.amount

        # restore back receiver balance
        elif balance_object.user_id == receiver:
            balance_object.balance += settlement.amount

    Balance.objects.bulk_update(user_balance_objects, ["balance"])
