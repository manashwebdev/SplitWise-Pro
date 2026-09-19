import { useState, useEffect } from "react";
import axios from "axios";

import StatsCard from "../components/StatsCard";
import TripCard from "../components/TripCard";
import ActivityCard from "../components/ActivityCard";
import Sidebar from "../components/Sidebar";
import AnalyticsChart from "../components/AnalyticsChart";
import SettlementCard from "../components/SettlementCard";
import FloatingButton from "../components/FloatingButton";
import ExpenseModal from "../components/ExpenseModal";
import CreateTripModal from "../components/CreateTripModal";
import { stats } from "../data/dummyData";

export default function Dashboard() {

  const [trips, setTrips] = useState([]);

  const [activities, setActivities] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem("activities")
        ) || []
      );
    });

  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [openTripModal, setOpenTripModal] = useState(false);

  const totalTrips = trips.length;

  const totalMembers = trips.reduce(
    (sum, trip) =>
      sum + (trip.members?.length || 0),
    0
  );

  const totalBudget = trips.reduce(
    (sum, trip) =>
      sum + Number(trip.budget || 0),
    0
  );

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          "https://splitwise-pro-v1.onrender.com/api/trips"
        );

        setTrips(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 relative">

        {/* Dashboard Glow */}
        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-violet-600/10 blur-[250px]" />

          <div className="absolute top-[900px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-violet-500/10 blur-[220px]" />

        </div>

        {/* Dashboard Content */}
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Welcome Back 👋
            </h1>

            <p className="text-gray-400">
              Manage your trips and expenses.
            </p>
          </div>

          {/* Create Trip Button */}
          <button
            onClick={() => setOpenTripModal(true)}
            className="mb-10 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition"
          >
            Create Trip
          </button>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

            <StatsCard
              title="Total Trips"
              value={totalTrips}
            />

            <StatsCard
              title="Total Members"
              value={totalMembers}
            />

            <StatsCard
              title="Total Budget"
              value={`₹${totalBudget}`}
            />

            <StatsCard
              title="Active Trips"
              value={totalTrips}
            />

          </div>

          {/* Analytics Chart */}
          <div className="mb-16">
            <AnalyticsChart />
          </div>

          {/* Settlement */}
          <div className="mb-16">
            <SettlementCard />
          </div>

          {/* Recent Trips */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Recent Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {trips.length === 0 ? (

               <div className="col-span-full p-8 rounded-3xl border border-dashed border-white/10 text-center text-gray-400">
                  No trips yet. Create your first trip.
                </div>

              ) : (

                trips.map((trip) => (
                  <TripCard
                    key={trip._id}
                    trip={trip}
                  />
                ))

              )}

            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  user={activity.user}
                  amount={activity.amount}
                  title={activity.title}
                />
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Floating Add Expense Button */}
      <FloatingButton
        onClick={() => setOpenExpenseModal(true)}
      />

      {/* Expense Modal */}
      <ExpenseModal
        open={openExpenseModal}
        onClose={() => setOpenExpenseModal(false)}
      />

      {/* Create Trip Modal */}
      <CreateTripModal
        open={openTripModal}
        onClose={() => setOpenTripModal(false)}
      />

    </div>
  );
}