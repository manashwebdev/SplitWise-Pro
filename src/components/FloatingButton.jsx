export default function FloatingButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="
        fixed
        bottom-6
        right-6
       w-14 h-14 sm:w-16 sm:h-16
        rounded-full
        bg-violet-600
        hover:bg-violet-500
        shadow-[0_0_40px_rgba(139,92,246,0.5)]
        text-3xl
        font-bold
        transition-all
        hover:scale-110
        z-50
      "
        >
            +
        </button>
    );
}