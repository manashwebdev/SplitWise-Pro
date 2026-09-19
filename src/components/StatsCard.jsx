export default function StatsCard({
  title,
  value,
}) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      p-6
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      min-h-[140px]

      hover:border-violet-500/40
      hover:bg-white/10
      hover:-translate-y-2

      hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]

      transition-all
      duration-300
      "
    >
      {/* Glow */}
      <div
        className="
        absolute
        -top-10
        -right-10
        w-32
        h-32
        bg-violet-500/20
        blur-3xl
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        "
      />

      {/* Title */}
      <p
        className="
        text-gray-400
        text-sm
        mb-3
        relative
        z-10
        "
      >
        {title}
      </p>

      {/* Value */}
      <h2
        className="
        text-4xl
        font-bold
        relative
        z-10

        group-hover:text-violet-400
        transition-all
        duration-300
        "
      >
        {value}
      </h2>

      {/* Bottom Line */}
      <div
        className="
        absolute
        bottom-0
        left-0
        h-[2px]
        w-0
        bg-violet-500

        group-hover:w-full
        transition-all
        duration-500
        "
      />
    </div>
  );
}