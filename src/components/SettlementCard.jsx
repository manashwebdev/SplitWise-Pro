export default function SettlementCard() {
  const handleSettleUp = () => {
    alert("Settlement completed successfully 🎉");
  };

  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Settlement Summary
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-300">
          Auto Calculated
        </span>
      </div>

      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <span className="text-gray-400">
            Aryan owes Rahul
          </span>

          <span className="font-semibold text-red-400">
            ₹850
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <span className="text-gray-400">
            Manash owes Aryan
          </span>

          <span className="font-semibold text-red-400">
            ₹320
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <span className="text-gray-400">
            Rahul receives
          </span>

          <span className="font-semibold text-green-400">
            ₹1170
          </span>
        </div>

      </div>

      <button
        onClick={handleSettleUp}
        className="
          mt-6
          w-full
          py-3
          rounded-xl
          bg-violet-600
          hover:bg-violet-500
          hover:scale-[1.02]
          transition-all
          duration-300
          font-semibold
        "
      >
        Settle Up
      </button>

    </div>
  );
}