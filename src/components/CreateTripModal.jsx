import { useState } from "react";
import axios from "axios";

export default function CreateTripModal({
  open,
  onClose,
}) {
  const [tripName, setTripName] = useState("");
  const [budget, setBudget] = useState("");

  if (!open) return null;

  const handleCreateTrip = async () => {
    if (!tripName || !budget) return;

    try {
      await axios.post(
        "https://splitwise-pro-v1.onrender.com/api/trips",
        {
          name: tripName,
          budget: Number(budget),
          members: [],
        }
      );

      setTripName("");
      setBudget("");

      onClose();

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to create trip");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create New Trip
        </h2>

        <input
          type="text"
          value={tripName}
          onChange={(e) =>
            setTripName(e.target.value)
          }
          placeholder="Trip Name"
          className="w-full p-3 rounded-xl bg-black border border-white/10 mb-4"
        />

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
          placeholder="Budget"
          className="w-full p-3 rounded-xl bg-black border border-white/10 mb-6"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateTrip}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}