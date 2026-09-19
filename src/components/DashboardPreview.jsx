export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="max-w-6xl mx-auto px-6 py-24"
    >
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">

        <h2 className="text-3xl font-bold mb-8">
          Goa Trip
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-black/30">
            <p className="text-gray-400">Budget</p>
            <h3 className="text-4xl font-bold mt-2">
              ₹20,000
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-black/30">
            <p className="text-gray-400">Spent</p>
            <h3 className="text-4xl font-bold mt-2">
              ₹14,250
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-black/30">
            <p className="text-gray-400">Remaining</p>
            <h3 className="text-4xl font-bold mt-2 text-green-400">
              ₹5,750
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}