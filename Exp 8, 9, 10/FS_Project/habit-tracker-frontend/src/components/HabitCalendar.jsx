import React, { useEffect, useState } from "react";
import API from "../api/api";

const HabitCalendar = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // today's date
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user's habits
  useEffect(() => {
    API.get(`/habits/user/${userId}`)
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, [userId]);

  // Mark a habit completed for selected date
  const markCompleted = async (habitId) => {
    try {
      setLoading(true);
      await API.post(`/completions/update`, null, {
        params: { userId, habitId, date: selectedDate },
      });
      setMessage("✅ Habit marked as completed!");
    } catch (error) {
      console.error("Error marking habit:", error);
      setMessage("❌ Could not update habit.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-2xl">🗓️</span>
        <h2 className="text-xl font-semibold text-gray-800">Habit Calendar</h2>
      </div>

      {/* Date Picker */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Feedback message */}
      {message && (
        <p
          className={`text-center mb-4 font-medium ${
            message.startsWith("❌")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Habit list */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div
              key={habit._id || habit.id}
              className="bg-gray-50 border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {habit.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Frequency:{" "}
                  <span className="font-medium text-indigo-600">
                    {habit.frequency}
                  </span>
                </p>
              </div>

              <button
                disabled={loading}
                onClick={() => markCompleted(habit._id || habit.id)}
                className={`mt-auto py-2 rounded-xl font-medium transition-all duration-200 ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {loading ? "Updating..." : "Done"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No habits found 😅
          </p>
        )}
      </div>
    </div>
  );
};

export default HabitCalendar;
