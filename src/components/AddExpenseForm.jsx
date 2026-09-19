import { useState } from "react";

export default function AddExpenseForm({
  onAddExpense,
  members,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("Food");
  const [participants, setParticipants] = useState([]);
  const [receiptImage, setReceiptImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !paidBy) return;

    onAddExpense({
      id: Date.now(),
      title,
      amount: Number(amount),
      paidBy,
      category,
      participants,
      receiptImage,
    });

    setTitle("");
    setAmount("");
    setPaidBy("");
    setCategory("Food");
    setParticipants([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-3xl border border-white/10 bg-white/5 mb-10"
    >
      <h2 className="text-2xl font-bold mb-4">
        Add Expense
      </h2>

      <div className="grid gap-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense Title"
          className="p-3 rounded-xl bg-black border border-white/10"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="p-3 rounded-xl bg-black border border-white/10"
        />

        <input
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          placeholder="Paid By"
          className="p-3 rounded-xl bg-black border border-white/10"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-xl bg-black border border-white/10"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Hotel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
        </select>

        <div>
          <p className="mb-2 text-gray-400">
            Upload Receipt
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = () => {
                setReceiptImage(reader.result);
              };

              reader.readAsDataURL(file);
            }}
            className="p-3 rounded-xl bg-black border border-white/10 w-full"
          />
        </div>

        <div>
          <p className="mb-2 text-gray-400">
            Split Between
          </p>

          <div className="flex flex-wrap gap-3">

            {members?.map((member) => (

              <label
                key={member}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={participants.includes(member)}
                  onChange={(e) => {

                    if (e.target.checked) {
                      setParticipants([
                        ...participants,
                        member,
                      ]);
                    } else {
                      setParticipants(
                        participants.filter(
                          (m) => m !== member
                        )
                      );
                    }

                  }}
                />

                {member}

              </label>

            ))}

          </div>
        </div>

        <button
          type="submit"
          className="py-3 rounded-xl bg-violet-600 hover:bg-violet-500"
        >
          Add Expense
        </button>

      </div>
    </form>
  );
}