export default function ActivityCard({
  user,
  amount,
  title,
}) {
  return (
    <div className="p-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center font-bold text-violet-300">
          {user[0]}
        </div>

        <div>
          <h3 className="font-semibold">
            {user} paid ₹{amount}
          </h3>

          <p className="text-gray-400 text-sm">
            {title}
          </p>
        </div>

      </div>

    </div>
  );
}