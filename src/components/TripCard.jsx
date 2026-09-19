
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function TripCard({ trip }) {

  const [editing, setEditing] =
    useState(false);

  const navigate = useNavigate();

  const expenses =
    JSON.parse(
      localStorage.getItem(
        `trip-${trip._id}-expenses`
      )
    ) || [];



  const spent = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );
  const budget = Number(trip.budget || 0);

  const remaining = budget - spent;
  const progress = budget > 0 ? (spent / budget) * 100 : 0;

  let status = "🟢 Active";

  if (remaining < 0) {
    status = "🔴 Over Budget";
  } else if (progress >= 100) {
    status = "✅ Completed";
  }


  const deleteTrip = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Delete ${trip.name}?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/trips/${trip._id}`
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete trip");
    }
  };

  const editTrip = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newName = prompt(
      "Trip Name",
      trip.name
    );

    const newBudget = prompt(
      "Trip Budget",
      trip.budget
    );

    if (!newName || !newBudget) return;

    const trips =
      JSON.parse(
        localStorage.getItem("trips")
      ) || [];

    const updatedTrips = trips.map(
      (item) =>
        item._id === trip._id
          ? {
            ...item,
            name: newName,
            budget: Number(newBudget),
          }
          : item
    );

    localStorage.setItem(
      "trips",
      JSON.stringify(updatedTrips)
    );

    window.location.reload();
  };

  console.log(trip);

  return (
    <Link
      to={`/trip/${trip._id}`}
      className="block"
    >
      <div
        className="
          p-6
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-white/10
          to-white/5
          backdrop-blur-xl
          hover:scale-[1.02]
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <div className="flex items-center justify-between mb-4">
          
          <h3 className="text-xl font-bold">
            {trip.name}
          </h3>

          <span
            className={`px-3 py-1 text-xs rounded-full ${status.includes("Over")
              ? "bg-red-500/20 text-red-400"
              : status.includes("Completed")
                ? "bg-blue-500/20 text-blue-400"
                : "bg-green-500/20 text-green-400"
              }`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-3 text-gray-300">
          <p>
            Budget:{" "}
            <span className="text-white">
              ₹{trip.budget}
            </span>
          </p>

          <p>
            Spent:{" "}
            <span className="text-white">
              ₹{spent}
            </span>
          </p>

          <p>
            Members:
            <span className="text-white">
              {" "}
              {trip.members?.length || 0}
            </span>
          </p>

          <p
            className={
              remaining < 0
                ? "text-red-400"
                : "text-green-400"
            }
          >
            Remaining: ₹{remaining}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Budget Used</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${progress < 70
                ? "bg-green-500"
                : progress < 90
                  ? "bg-yellow-500"
                  : "bg-red-500"
                }`}
              style={{
                width: `${Math.min(progress, 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={editTrip}
            className="flex-1 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          >
            Edit
          </button>

          <button
            onClick={deleteTrip}
            className="flex-1 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            Delete
          </button>
        </div>

      </div>
    </Link>
  );
}