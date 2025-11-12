import React, { useEffect, useState } from "react";
import API from "../api/api";
import HabitList from "../components/HabitList";
import BadgeGallery from "../components/BadgeGallery";

const Profile = () => {
  const userId = "690859a06340d596e9d54805";
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get(`/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-indigo-500 text-white text-4xl flex items-center justify-center font-bold mb-4">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {user.name}
            </h1>
            <p className="text-gray-500">{user.email}</p>

            {/* Level / XP */}
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="bg-indigo-50 px-5 py-3 rounded-xl">
                <p className="text-sm text-gray-600">Level</p>
                <p className="text-xl font-semibold text-indigo-600">
                  {user.level}
                </p>
              </div>
              <div className="bg-green-50 px-5 py-3 rounded-xl">
                <p className="text-sm text-gray-600">XP</p>
                <p className="text-xl font-semibold text-green-600">
                  {user.xp}
                </p>
              </div>
              <div className="bg-yellow-50 px-5 py-3 rounded-xl">
                <p className="text-sm text-gray-600">Badges</p>
                <p className="text-xl font-semibold text-yellow-600">
                  {user.badges?.length || 0}
                </p>
              </div>
            </div>

            {/* Badge Summary */}
            <div className="mt-6 text-gray-700 text-sm max-w-md mx-auto">
              <p>
                <b>Achievements:</b>{" "}
                {user.badges && user.badges.length > 0
                  ? user.badges.join(", ")
                  : "No badges earned yet 😅"}
              </p>
            </div>
          </div>
        </div>

        {/* Badge Gallery */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🏅 Your Badges
          </h2>
          <BadgeGallery userId={userId} />
        </div>

        {/* Habit List */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 Your Habits
          </h2>
          <HabitList userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
