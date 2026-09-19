import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">SplitWise Pro</h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#features">Features</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#cta">Get Started</a>
        </div>

        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-xl bg-white text-black font-medium"
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}