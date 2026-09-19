import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[180px]" />

      <Sidebar />

      <div className="flex-1 p-8 relative z-10">

        <h1 className="text-6xl font-black tracking-tight mb-3">
          Settings
        </h1>

        <p className="text-gray-400 mb-10">
          Manage your SplitWise Pro preferences.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Theme Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300 hover:scale-[1.02]">

            <h3 className="text-2xl font-bold mb-3">
              Theme
            </h3>

            <p className="text-gray-400 mb-6">
              Dark mode is currently enabled.
            </p>

            <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 font-semibold">
              Dark Mode
            </button>

          </div>

          {/* Data Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02]">

            <h3 className="text-2xl font-bold mb-3">
              Data
            </h3>

            <p className="text-gray-400 mb-6">
              Delete all trips, expenses and analytics data.
            </p>

            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Delete all app data?"
                );

                if (!confirmDelete) return;

                localStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold"
            >
              Clear All Data
            </button>

          </div>

        </div>

        {/* App Info */}
        <div className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

          <h3 className="text-2xl font-bold mb-3">
            SplitWise Pro
          </h3>

          <p className="text-gray-400">
            Version 1.0.0
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Built with React, Tailwind CSS and Express.
          </p>

        </div>

      </div>

    </div>
  );
}