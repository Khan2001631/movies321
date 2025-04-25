import React, { useState } from 'react';
import MovieModal from './MovieModal';
import { motion } from 'framer-motion';
import { useWatchedMovies } from '../context/WatchedMoviesContext';

const KEY = 'f84fc31d';
// 1fa7fd43

const MovieList = () => {
  const { watchedMovies } = useWatchedMovies();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      if (data.Response === 'False') throw new Error(data.Error);
      setMovies(data.Search);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Search Movies</h2>
            <p className="text-gray-400 mb-8">
              Discover your next favorite movie. Search by title, genre, or year.
            </p>
            
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter movie title..."
                className="w-full px-6 py-4 bg-gray-800 text-white rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-red-600 pr-16"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Results Section */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-400">Searching for movies...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedMovie(movie)}
              >
                <div className="aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{movie.Title}</h3>
                      <p className="text-gray-300 text-sm">{movie.Year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try searching with a different title</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Start your search</h3>
            <p className="text-gray-400">Enter a movie title to begin</p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieList; 