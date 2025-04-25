import React, { useState } from 'react';
import MovieModal from './MovieModal';
import { useWatchedMovies } from '../context/WatchedMoviesContext';

const WatchedMovies = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { watchedMovies } = useWatchedMovies();
    
    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">My Watched Movies</h2>
            <div className="text-gray-400">
                <span className="text-2xl font-semibold">{watchedMovies?.length}</span>
                <span className="ml-2">movies watched</span>
            </div>
            </div>

            {watchedMovies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                className="w-20 h-20 text-gray-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h18M3 16h18"
                />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">No movies watched yet</h3>
                <p className="text-gray-400">Start watching movies and mark them as watched to see them here</p>
            </div>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {watchedMovies.map((movie) => (
                <div
                    key={movie.imdbID}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedMovie(movie)}
                >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 p-4">
                        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                        <p className="text-gray-300 text-sm">{movie.year}</p>
                        <div className="flex items-center mt-2">
                            <svg
                            className="w-5 h-5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                            </svg>
                            <span className="text-green-500 ml-1">Watched</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
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

export default WatchedMovies; 