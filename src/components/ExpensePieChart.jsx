import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#ec4899",
];

export default function ExpensePieChart({
  food,
  transport,
  hotel,
  shopping,
}) {
  const data = [
    { name: "Food", value: food },
    { name: "Transport", value: transport },
    { name: "Hotel", value: hotel },
    { name: "Shopping", value: shopping },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
      <h2 className="text-2xl font-bold mb-6">
        Expense Breakdown
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}