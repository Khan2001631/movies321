import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
            Welcome to Movies321
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl mb-12 text-center max-w-2xl text-gray-300"
        >
          Your ultimate destination for tracking and discovering amazing movies
        </motion.p>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full text-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/20"
          onClick={() => navigate('/movies')}
        >
          Get Started
        </motion.button>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 text-gray-600 text-sm">
          <span className="animate-pulse">🎬</span> Discover • Rate • Enjoy
        </div>
        <div className="absolute bottom-8 right-8 text-gray-600 text-sm">
          Powered by <span className="text-red-500">OMDb API</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 