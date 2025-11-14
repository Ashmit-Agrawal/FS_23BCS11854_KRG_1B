import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/dashboard/${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching dashboard:", err));
  }, [userId]);

  if (!data)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 font-medium animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );

  const chartData = Object.entries(data.habitBreakdown || {}).map(
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
    <div className="pb-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎯 Daily Habit Dashboard
      </h1>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500 text-white text-3xl font-bold">
          {data.name ? data.name.charAt(0).toUpperCase() : "U"}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-lg font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-500 mt-1">Level {data.level}</p>
          <p className="text-sm text-gray-500">XP: {data.xp}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
          <div className="bg-white rounded-xl shadow-md px-6 py-3 text-center">
            <p className="text-2xl font-bold text-indigo-600">
              {data.badges?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Badges</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Weekly Progress
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              tickFormatter={(value) =>
                value.length > 8 ? `${value.slice(0, 8)}…` : value
              }
            />
            <YAxis stroke="#6B7280" />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="completions" fill="#22C55E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
