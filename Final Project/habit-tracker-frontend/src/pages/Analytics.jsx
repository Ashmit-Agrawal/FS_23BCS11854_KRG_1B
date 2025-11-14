import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Analytics = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/dashboard/${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, [userId]);

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-500 animate-pulse">
          Loading analytics...
        </div>
      </div>
    );

  const xpData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    xp: Math.min(data.xp, Math.floor((i + 1) * (data.xp / 7))),
  }));

  const completionData = Object.entries(data.habitBreakdown || {}).map(
    ([habitName, count]) => ({
      name: habitName,
      completions: count,
    })
  );

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, completions } = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg px-4 py-2">
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-gray-600 text-sm">
            Completions: <span className="font-medium">{completions}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <h1 className=" pt-7 text-3xl font-bold text-center mb-10 text-gray-800">
        📊 Your Weekly Analytics
      </h1>

      {/* Charts Grid */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* XP Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            XP Progress (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={xpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              />
              <Line
                type="monotone"
                dataKey="xp"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Habit Completions */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Habit Completions
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                tickFormatter={(value) =>
                  value.length > 7 ? `${value.slice(0, 7)}…` : value
                }
              />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="completions"
                fill="#22C55E"
                radius={[6, 6, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* XP Summary */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg text-center">
        <p className="text-gray-700 text-lg">
          You’ve earned{" "}
          <span className="font-bold text-indigo-600">{data.xp}</span> XP so far!
          Keep up your streak 💪
        </p>
      </div>
    </div>
  );
};

export default Analytics;
