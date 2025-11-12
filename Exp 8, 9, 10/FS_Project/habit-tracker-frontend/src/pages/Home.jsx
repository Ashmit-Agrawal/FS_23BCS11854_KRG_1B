import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import HabitCalendar from "../components/HabitCalendar";
import AddHabit from "../components/AddHabit";
import BadgeGallery from "../components/BadgeGallery";

const Home = () => {
  const userId = "690859a06340d596e9d54805";
  const [refresh, setRefresh] = useState(false);

  const handleHabitAdded = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🏠 Dashboard Overview
        </h1>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Side - Dashboard + Badges */}
          <main className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Dashboard userId={userId} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <BadgeGallery userId={userId} />
            </div>
          </main>

          {/* Right Side - Add Habit + Calendar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <AddHabit userId={userId} onHabitAdded={handleHabitAdded} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <HabitCalendar key={refresh} userId={userId} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
