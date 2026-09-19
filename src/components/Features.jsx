import { motion } from "framer-motion";
import {
  Wallet,
  Users,
  PieChart,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Splitting",
    desc: "Automatically calculate who owes whom."
  },
  {
    icon: Users,
    title: "Group Tracking",
    desc: "See everyone's contribution instantly."
  },
  {
    icon: PieChart,
    title: "Budget Insights",
    desc: "Track spending against trip budgets."
  },
  {
    icon: TrendingUp,
    title: "Live Analytics",
    desc: "Visualize expenses in real time."
  }
];

export default function Features() {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-6 py-32"
    >
      <h2 className="text-5xl font-bold text-center mb-16">
        Everything you need
      </h2>

      <motion.div
  whileHover={{
    y: -8,
    scale: 1.03
  }}
 className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => (
          <motion.div
  whileHover={{
    y: -8,
    scale: 1.03
  }}

            key={item.title}
            className="p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <item.icon size={32} />

            <h3 className="text-xl font-semibold mt-5">
              {item.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}