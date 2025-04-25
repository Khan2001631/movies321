import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import { useWatchedMovies } from '../context/WatchedMoviesContext';

const KEY = "f84fc31d";

const MovieModal = ({ movie, onClose }) => {
  const { watchedMovies, addWatched, deleteWatched } = useWatchedMovies();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watchedMovies.some(watched => watched.imdbID === movie.imdbID);
  const watchedUserRating = watchedMovies.find(
    watched => watched.imdbID === movie.imdbID
  )?.userRating;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movie.imdbID}`
        );
        const data = await res.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  const handleAddToWatched = () => {
    if (!movieDetails) return;
    
    const newWatchedMovie = {
      imdbID: movie.imdbID,
      title: movieDetails.Title,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      imdbRating: Number(movieDetails.imdbRating),
      runtime: Number(movieDetails.Runtime.split(' ')[0]),
      userRating: userRating,
    };
    
    addWatched(newWatchedMovie);
    onClose();
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="
            bg-gray-900 rounded-xl w-full 
            sm:max-w-md md:max-w-2xl lg:max-w-4xl 
            max-h-[90vh] overflow-y-auto
            relative
          "
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
          ) : movieDetails ? (
            <div className="flex flex-col md:flex-row">
              {/* Movie Poster */}
              <div className="w-full md:w-1/3 flex-none">
                <img
                  src={movieDetails.Poster}
                  alt={movieDetails.Title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Movie Details */}
              <div className="w-full md:w-2/3 p-4 md:p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{movieDetails.Title}</h2>
                <div className="flex items-center gap-4 text-gray-400 mb-4">
                  <span>{movieDetails.Year}</span>
                  <span>•</span>
                  <span>{movieDetails.Runtime}</span>
                  <span>•</span>
                  <span>{movieDetails.Genre}</span>
                </div>

                <p className="text-gray-300 mb-6">{movieDetails.Plot}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-gray-400">Director:</span>
                    <span className="text-white ml-2">{movieDetails.Director}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Cast:</span>
                    <span className="text-white ml-2">{movieDetails.Actors}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">IMDb Rating:</span>
                    <span className="text-white ml-2">⭐️ {movieDetails.imdbRating}</span>
                  </div>
                </div>

                {!isWatched ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                      <span className="text-gray-400">
                        {userRating > 0 ? `Your rating: ${userRating}` : 'Rate this movie'}
                      </span>
                    </div>
                    {userRating > 0 && (
                      <button
                        onClick={handleAddToWatched}
                        className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        + Add to Watched
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
                      You've watched this movie! Your rating: {watchedUserRating} ⭐️
                    </div>
                    <button
                      onClick={() => {
                        deleteWatched(movie.imdbID);
                        onClose();
                      }}
                      className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      Remove from Watched
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-white">
              Error loading movie details
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MovieModal; 