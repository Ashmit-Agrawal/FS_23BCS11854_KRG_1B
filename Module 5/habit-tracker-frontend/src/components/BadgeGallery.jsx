import React, { useEffect, useState } from "react";
import API from "../api/api";

const BadgeGallery = ({ userId }) => {
  const [badges, setBadges] = useState([]);

  // Fetch user badges
  useEffect(() => {
    API.get(`/users/${userId}`)
      .then((res) => setBadges(res.data.badges || []))
      .catch((err) => console.error("Error fetching badges:", err));
  }, [userId]);

  // Predefined badge metadata
  const badgeData = {
    "3_day_streak": {
      label: "🔥 3-Day Streak",
      desc: "Consistency is key!",
      color: "bg-yellow-400",
    },
    "7_day_streak": {
      label: "⚡ 7-Day Streak",
      desc: "One week of focus!",
      color: "bg-blue-400",
    },
    "30_day_streak": {
      label: "🏆 30-Day Streak",
      desc: "You’re unstoppable!",
      color: "bg-green-500",
    },
  };

  return (
    <div className="card bg-base-100 mt-4">
      <div className="card-body">
        <h2 className="card-title justify-center">🏅 Badge Gallery</h2>

        {badges.length === 0 ? (
          <p className="text-center text-gray-500">No badges earned yet 😅</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const info = badgeData[badge] || {
                label: badge,
                desc: "Custom Achievement",
                color: "bg-gray-400",
              };
              return (
                <div key={badge} className="card bg-transparent shadow-sm">
                  <div className={`p-4 rounded-lg text-center text-white ${info.color}`}>
                    <h3 className="text-lg font-semibold">{info.label}</h3>
                    <p className="text-sm mt-1">{info.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeGallery;
