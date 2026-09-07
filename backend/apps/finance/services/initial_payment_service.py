from apps.finance.models import InitialPayment


def initial_payment_creation_service(expense, payers):
    """
    Creates InitialPayment and returns it.
    """
    initial_payment_payload = [
        InitialPayment(
            expense=expense,
            paid_by=payer.get("id"),
            amount=payer.get("amount"),
        )
        for payer in payers
    ]

    initial_payment_obj = InitialPayment.objects.bulk_create(initial_payment_payload)
    
    return initial_payment_obj
