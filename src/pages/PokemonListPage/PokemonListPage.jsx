import React, {useEffect, useState} from 'react';
import PokemonList from '../../components/pokeList/pokemonList';
import {
    fetchAllPokemon,
    searchPokemon,
    sortPokemon,
    filterPokemonByType,
    filterPokemonByGen
} from '../../services/pokemonService';
import {fetchAllPokemonTypes} from "../../services/typeService.js";
import {fetchAllPokemonGens} from "../../services/genService.js";
import './PokemonListPage.css';
import Navbar from "../../components/navbar/navbar.jsx";

const PokemonListPage = () => {
    const [pokemon, setPokemon] = useState([]);
    const [types, setTypes] = useState([]);
    const [gens, setGens] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState('no-ascending');
    const [selectedType, setSelectedType] = useState('');
    const [selectedGen, setSelectedGen] = useState('');

    useEffect(() => {
        const getAllData = async () => {
            try {
                const pokemonData = await fetchAllPokemon();
                const typeData = await fetchAllPokemonTypes();
                const genData = await fetchAllPokemonGens();
                setPokemon(pokemonData);
                setFilteredPokemon(pokemonData);
                setTypes(typeData);
                setGens(genData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getAllData();
    }, []);

    useEffect(() => {
        let filtered = pokemon;

        if (searchTerm.trim() !== "") {
            filtered = searchPokemon(pokemon, searchTerm);
        }

        console.log(pokemon)

        filtered = filterPokemonByType(filtered, selectedType);
        filtered = filterPokemonByGen(filtered, selectedGen);
        filtered = sortPokemon(filtered, sortOption);

        setFilteredPokemon(filtered);
    }, [searchTerm, sortOption, pokemon, selectedType, selectedGen]);

    return (
        <div>
            {loading ? (
                <p className={`loading`}>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className={`upper scrolling-image-container`}>
                    <div className="scrolling-image">
                        <Navbar
                            className={`navbar `}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            setSearchTerm={setSearchTerm}
                            types={types}
                            gens={gens}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            selectedGen={selectedGen}
                            setSelectedGen={setSelectedGen}
                        />
                        <PokemonList pokemon={filteredPokemon}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonListPage;
