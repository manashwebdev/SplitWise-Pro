import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold"
        >
          Split expenses.
          <br />
          Keep friendships.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-8 text-xl"
        >
          Track spending, manage budgets, and settle fairly without awkward conversations.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">

          <Link
            to="/dashboard"
            className="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            Start Tracking
          </Link>

          <a
            href="#dashboard-preview"
            className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/5 transition"
          >
            View Demo
          </a>

        </div>

      </div>
    </section>
  );
}