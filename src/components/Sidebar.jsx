import {
  LayoutDashboard,
  Plane,
  BarChart3,
  Settings,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-white/10 bg-white/5 backdrop-blur-xl p-6">

      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold">
          SplitWise
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Expense Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">

        <Link
          to="/dashboard"
          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
            location.pathname === "/dashboard"
              ? "bg-violet-500/20 text-violet-300"
              : "hover:bg-white/10"
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/trips"
          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
            location.pathname === "/trips"
              ? "bg-violet-500/20 text-violet-300"
              : "hover:bg-white/10"
          }`}
        >
          <Plane size={18} />
          Trips
        </Link>

        <Link
          to="/analytics"
          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
            location.pathname === "/analytics"
              ? "bg-violet-500/20 text-violet-300"
              : "hover:bg-white/10"
          }`}
        >
          <BarChart3 size={18} />
          Analytics
        </Link>

        <Link
          to="/settings"
          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
            location.pathname === "/settings"
              ? "bg-violet-500/20 text-violet-300"
              : "hover:bg-white/10"
          }`}
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>

      {/* Budget Health */}
      <div className="mt-auto p-4 rounded-2xl border border-violet-500/20 bg-violet-500/10">

        <p className="text-sm text-violet-300">
          Budget Health
        </p>

        <h3 className="text-2xl font-bold mt-2">
          82%
        </h3>

        <p className="text-xs text-gray-400 mt-1">
          Spending is under control
        </p>

      </div>

    </aside>
  );
}