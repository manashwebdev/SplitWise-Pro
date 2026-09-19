export default function ExpenseModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Expense
        </h2>

        <input
          placeholder="Expense Title"
          className="w-full p-3 rounded-xl bg-black border border-white/10 mb-4"
        />

        <input
          placeholder="Amount"
          className="w-full p-3 rounded-xl bg-black border border-white/10 mb-4"
        />

        <button
          className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500"
        >
          Save Expense
        </button>

      </div>

    </div>
  );
}