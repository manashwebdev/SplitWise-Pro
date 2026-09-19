export default function ActivityTimeline() {
    const activities =
        JSON.parse(
            localStorage.getItem("activities")
        ) || [];

    return (
        <div className="space-y-4">
            {activities.length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-gray-400">
                    No activity yet
                </div>
            ) : (
                activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-white">
                                    {activity.title}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    By {activity.user}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    {activity.date}
                                </p>
                            </div>

                            <span className="text-violet-400 font-bold">
                                ₹{activity.amount}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}