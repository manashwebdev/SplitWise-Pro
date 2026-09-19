import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/trips"
        );

        const chartData = res.data.map((trip) => {
          const totalSpent =
            trip.expenses?.reduce(
              (sum, expense) =>
                sum + Number(expense.amount || 0),
              0
            ) || 0;

          return {
            name: trip.name,
            spending: totalSpent,
          };
        });

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">

      <h2 className="text-2xl font-bold mb-6">
        Spending Analytics
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="spending"
              stroke="#8b5cf6"
              strokeWidth={4}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}