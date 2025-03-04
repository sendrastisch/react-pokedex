import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage/PokemonListPage.jsx';
import PokemonDetailPage from './pages/PokemonDetailPage/PokemonDetailPage.jsx';
import {fetchAllPokemon, fetchAllGenerations} from "./services/pokemonService.js";
import {fetchAllPokemonTypes} from "./services/typeService.js";
import Navbar from "./components/navbar/navbar.jsx";
import Loader from "./components/loader/loader.jsx";

const App = () => {
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const [gens, setGens] = useState([]);
    const [sortOption, setSortOption] = useState('no-ascending');
    const [selectedType, setSelectedType] = useState('');
    const [selectedGen, setSelectedGen] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getAllData = async () => {
            const pokemonData = await fetchAllPokemon();
            const typeData = await fetchAllPokemonTypes();
            const genData = await fetchAllGenerations();

            setTypes(typeData);
            setPokemon(pokemonData);
            setGens(genData);
            setIsLoading(false);
        };
        getAllData();
    }, []);

    return (
        <Router>
            <Navbar
                sortOption={sortOption}
                setSortOption={setSortOption}
                types={types}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                gens={gens}
                selectedGen={selectedGen}
                setSelectedGen={setSelectedGen}
                setSearchTerm={setSearchTerm}
                isLoading={isLoading}
            />
            {isLoading ? (
               <Loader/>
            ) : (
                <Routes>
                    <Route path="/" element={<PokemonListPage pokemon={pokemon}
                                                              sortOption={sortOption}
                                                              types={types}
                                                              gens={gens}
                                                              selectedType={selectedType}
                                                              selectedGen={selectedGen}
                                                              searchTerm={searchTerm}
                    />}/>
                    <Route path="/pokemon/:id" element={<PokemonDetailPage/>}/>
                </Routes>
            )}
        </Router>
    );
};

export default App;
