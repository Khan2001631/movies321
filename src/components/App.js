import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WatchedMoviesProvider } from '../context/WatchedMoviesContext';
import NavBar from './NavBar';
import HomePage from './HomePage';
import MovieList from './MovieList';
import WatchedMovies from './WatchedMovies';

const App = () => {
    return (
        <WatchedMoviesProvider>
        <Router>
            <div className="bg-gray-900 min-h-screen">
            <NavBar />
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MovieList />} />
                <Route path="/watched" element={<WatchedMovies />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </div>
        </Router>
        </WatchedMoviesProvider>
    );
}

export default App;
