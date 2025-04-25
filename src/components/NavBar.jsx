import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-red-600 text-2xl font-bold">Movies321</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') 
                  ? 'text-white border-b-2 border-red-600' 
                  : 'text-gray-300 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`${
                isActive('/movies')
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-300 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Movies
            </Link>
            <Link
              to="/watched"
              className={`${
                isActive('/watched')
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-300 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Watched
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
