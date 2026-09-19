import calculateSettlements from "../utils/calculateSettlements";
export default function SettlementEngine({
  expenses,
  members,
}) {
  if (
    !members ||
    members.length === 0
  ) {
    return (
      <div className="text-gray-400">
        Add members first
      </div>
    );
  }

  if (
    !expenses ||
    expenses.length === 0
  ) {
    return (
      <div className="text-gray-400">
        No expenses yet
      </div>
    );
  }

  const settlements =
    calculateSettlements(
      expenses,
      members
    );

  return (
    <div className="space-y-3">

      {settlements.length === 0 ? (
        <div className="p-4 rounded-xl bg-green-500/10 text-green-400">
          Everyone is settled up 🎉
        </div>
      ) : (
        settlements.map(
          (settlement, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 rounded-2xl border border-white/10 bg-white/5"
            >
              <span>
                {settlement.from}
                {" owes "}
                {settlement.to}
              </span>

              <span className="text-red-400 font-semibold">
                ₹
                {settlement.amount.toFixed(
                  0
                )}
              </span>
            </div>
          )
        )
      )}

    </div>
  );
}