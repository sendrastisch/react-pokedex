// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage/PokemonListPage.jsx';
import PokemonDetailPage from './pages/PokemonDetailPage/PokemonDetailPage.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokemonListPage />} />
                <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
