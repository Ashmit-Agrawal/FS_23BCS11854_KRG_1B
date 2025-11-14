import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Habit<span className="text-indigo-400">Tracker</span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              🏠 Home
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-1 text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              📊 Analytics
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-1 text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              👤 Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
