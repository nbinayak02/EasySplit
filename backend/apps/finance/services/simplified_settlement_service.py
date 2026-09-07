import heapq


def calculate_simplified_settlement(creditors_max_heap, debitors_min_heap):
    """
    Returns the order of transactions by which the group debts can be settled in minimum number of transactions.
    """

    transactions = []

    while creditors_max_heap and debitors_min_heap:
        # pop creditors data
        (c_balance, c_balanceId, c_balanceObj) = heapq.heappop_max(creditors_max_heap)

        # pop debitors data
        (d_balance, d_balanceId, d_balanceObj) = heapq.heappop(debitors_min_heap)

        # find amount to pay, min is used as debitor may have more amount to pay then that a creditor can receive

        amount_to_pay = min(c_balance, abs(d_balance))

        transaction = {
            "from": d_balanceObj.user.id,
            "to": c_balanceObj.user.id,
            "amount": amount_to_pay,
        }

        transactions.append(transaction)

        # find remaining balances
        remaining_creditor_balance = c_balance - amount_to_pay
        remaining_debitor_balance = d_balance + amount_to_pay

        # only push to heap if there are any remaining balances
        if remaining_creditor_balance > 0:
            heapq.heappush_max(
                creditors_max_heap,
                (remaining_creditor_balance, c_balanceId, c_balanceObj),
            )

        if remaining_debitor_balance < 0:
            heapq.heappush(
                debitors_min_heap,
                (remaining_debitor_balance, d_balanceId, d_balanceObj),
            )
    return transactions
