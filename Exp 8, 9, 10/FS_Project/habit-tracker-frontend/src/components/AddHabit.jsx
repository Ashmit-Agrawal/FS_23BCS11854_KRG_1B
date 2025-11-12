import React, { useState } from "react";
import API from "../api/api";

const AddHabit = ({ userId, onHabitAdded }) => {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      setMessage("⚠️ Please enter a habit name.");
      return;
    }

    try {
      const newHabit = {
        userId,
        name: habitName.trim(),
        frequency,
        createdOn: new Date().toISOString().split("T")[0],
      };

      await API.post("/habits", newHabit);
      setMessage("✅ Habit added successfully!");
      setHabitName("");
      if (onHabitAdded) onHabitAdded(); // refresh parent list
    } catch (error) {
      console.error("Error adding habit:", error);
      setMessage("❌ Failed to add habit.");
    } finally {
      setTimeout(() => setMessage(""), 2500);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-2xl">➕</span>
        <h2 className="text-xl font-semibold text-gray-800">Add New Habit</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Habit Name */}
        <div>
          <label
            htmlFor="habit-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Habit Name
          </label>
          <input
            id="habit-name"
            type="text"
            placeholder="e.g., Workout, Read"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            Give your habit a short, descriptive name.
          </p>
        </div>

        {/* Frequency */}
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Frequency
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-xl transition-all duration-200"
          >
            Add Habit
          </button>
        </div>
      </form>

      {/* Message */}
      {message && (
        <div className="mt-4 text-center">
          <p
            className={`text-sm font-medium ${
              message.startsWith("❌")
                ? "text-red-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddHabit;
