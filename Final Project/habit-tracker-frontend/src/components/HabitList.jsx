import React, { useEffect, useState, useCallback } from "react";
import API from "../api/api";

const HabitList = ({ userId, onHabitDeleted }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch habits
  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get(`/habits/user/${userId}`);
      setHabits(res.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // Delete habit
  const handleDelete = async (habitId) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await API.delete(`/habits/${habitId}`);
      setMessage("🗑️ Habit deleted successfully!");
      if (onHabitDeleted) onHabitDeleted();
      fetchHabits(); // refresh list
    } catch (err) {
      console.error("Error deleting habit:", err);
      setMessage("❌ Could not delete habit.");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        📋 My Habits
      </h2>

      {loading && (
        <p className="text-center text-gray-500 font-medium animate-pulse">
          Loading habits...
        </p>
      )}
      {message && (
        <p className="text-center text-green-600 font-medium mb-4">
          {message}
        </p>
      )}

      {habits.length === 0 ? (
        <p className="text-center text-gray-600 mt-3">
          No habits added yet 😅
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
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
                    {habit.frequency || "N/A"}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleDelete(habit._id || habit.id)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
