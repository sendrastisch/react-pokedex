import React, {useMemo, useState} from 'react';
import PokemonList from '../../components/PokemonList/pokemonList';
import './PokemonListPage.css';
import * as localStorageService from "../../services/localStorageService.js";
const PokemonListPage = ({ pokemon,sortOption, selectedType, selectedGen, searchTerm }) => {
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    useMemo(() => {
        let filtered = sortOption === "favorites"
            ? localStorageService.getFavorites() //haal favorieten op
            : pokemon; //gebruik originele Pokémon lijst als sortOption niet "favorites" is

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(p => p.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
        }
        if (selectedType) {
            filtered = filtered.filter(p => p.type.includes(selectedType));
        }
        if (selectedGen) {
            filtered = filtered.filter(p => p.gen === selectedGen);
        }
        switch (sortOption) {
            case 'name-ascending': filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-descending': filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'no-ascending': filtered = [...filtered].sort((a, b) => a.id - b.id); break;
            case 'no-descending': filtered = [...filtered].sort((a, b) => b.id - a.id); break;
            case 'random': filtered = [...filtered].sort(() => Math.random() - 0.5); break;
            default: break;
        }
        setFilteredPokemon(filtered);
    }, [pokemon, sortOption, selectedType, selectedGen, searchTerm]);

    return (
        <div>
                <PokemonList pokemon={filteredPokemon} />
        </div>
    );
};

export default PokemonListPage;