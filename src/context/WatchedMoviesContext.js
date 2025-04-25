// src/context/WatchedMoviesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchedMoviesContext = createContext();

export function WatchedMoviesProvider({ children }) {
    const [watchedMovies, setWatchedMovies] = useState([]);

    // load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('watchedMovies');
        if (saved) setWatchedMovies(JSON.parse(saved));
    }, []);

    // save to localStorage on change
    useEffect(() => {
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    }, [watchedMovies]);

    function addWatched(movie) {
        setWatchedMovies((prev) => {
        const exists = prev.find((m) => m.imdbID === movie.imdbID);
        if (exists) {
            // update rating if already present
            return prev.map((m) =>
            m.imdbID === movie.imdbID ? { ...m, userRating: movie.userRating } : m
            );
        }
        return [...prev, movie];
        });
    }

    function deleteWatched(imdbID) {
        setWatchedMovies((prev) => prev.filter((m) => m.imdbID !== imdbID));
    }

    return (
        <WatchedMoviesContext.Provider
        value={{ watchedMovies, addWatched, deleteWatched }}
        >
        {children}
        </WatchedMoviesContext.Provider>
    );
}

export function useWatchedMovies() {
    return useContext(WatchedMoviesContext);
}