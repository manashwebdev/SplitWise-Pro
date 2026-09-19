import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Analytics() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
  const fetchTrips = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/trips"
      );

      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchTrips();
}, []);

  const totalTrips = trips.length;

  const totalBudget = trips.reduce(
    (sum, trip) =>
      sum + Number(trip.budget || 0),
    0
  );

  const totalMembers = trips.reduce(
    (sum, trip) =>
      sum + (trip.members?.length || 0),
    0
  );

  const averageBudget =
    totalTrips > 0
      ? Math.floor(totalBudget / totalTrips)
      : 0;

  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">

      {/* Violet Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[180px]" />

      <Sidebar />

      <div className="flex-1 p-8 relative z-10">

        <h1 className="text-6xl font-black tracking-tight mb-3">
          Analytics
        </h1>

        <p className="text-gray-400 mb-10">
          Track all trips, budgets and members.
        </p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-violet-500/40 hover:bg-violet-500/5 hover:scale-[1.03] transition-all duration-300 cursor-pointer">

            <p className="text-gray-400">
              Total Trips
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {totalTrips}
            </h2>

          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-violet-500/40 hover:bg-violet-500/5 hover:scale-[1.03] transition-all duration-300 cursor-pointer">

            <p className="text-gray-400">
              Total Budget
            </p>

            <h2 className="text-4xl font-bold mt-3">
              ₹{totalBudget}
            </h2>

          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-violet-500/40 hover:bg-violet-500/5 hover:scale-[1.03] transition-all duration-300 cursor-pointer">

            <p className="text-gray-400">
              Total Members
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {totalMembers}
            </h2>

          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-violet-500/40 hover:bg-violet-500/5 hover:scale-[1.03] transition-all duration-300 cursor-pointer">

            <p className="text-gray-400">
              Avg Budget
            </p>

            <h2 className="text-4xl font-bold mt-3">
              ₹{averageBudget}
            </h2>

          </div>

        </div>

        {/* Recent Trips */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-violet-500/20 transition-all duration-300">

          <h2 className="text-3xl font-bold mb-6">
            Recent Trips
          </h2>

          {trips.length === 0 ? (

            <div className="text-center py-20">

              <h3 className="text-2xl font-bold mb-3">
                No Trips Yet
              </h3>

              <p className="text-gray-400">
                Create your first trip from Dashboard.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {trips.map((trip) => (

                <div
                  key={trip._id}
                  className="group flex justify-between items-center p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >

                  <div>

                    <h3 className="text-xl font-bold group-hover:text-violet-300 transition">
                      {trip.name}
                    </h3>

                    <p className="text-gray-400 mt-1">
                      {trip.members?.length || 0} Members
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Budget
                    </p>

                    <h3 className="text-2xl font-bold text-violet-400">
                      ₹{trip.budget}
                    </h3>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}