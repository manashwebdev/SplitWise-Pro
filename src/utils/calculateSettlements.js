export default function calculateSettlements(
  expenses,
  members
) {
  const balances = {};

  members.forEach((member) => {
    balances[member] = 0;
  });

  expenses.forEach((expense) => {
    const amount = Number(expense.amount);

    const participants =
      expense.participants || [];

    if (participants.length === 0)
      return;

    balances[expense.paidBy] += amount;

    const splitAmount =
      amount / participants.length;

    participants.forEach(
      (participant) => {
        balances[participant] -=
          splitAmount;
      }
    );
  });

  const debtors = [];
  const creditors = [];

  Object.entries(balances).forEach(
    ([member, balance]) => {
      if (balance < 0) {
        debtors.push({
          member,
          amount: Math.abs(balance),
        });
      }

      if (balance > 0) {
        creditors.push({
          member,
          amount: balance,
        });
      }
    }
  );

  const settlements = [];

  let i = 0;
  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(
      debtor.amount,
      creditor.amount
    );

    settlements.push({
      from: debtor.member,
      to: creditor.member,
      amount,
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount < 1) i++;
    if (creditor.amount < 1) j++;
  }

  return settlements;
}