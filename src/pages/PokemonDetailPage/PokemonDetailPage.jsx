// PokemonDetailPage.js
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPokemonById} from '../../services/pokemonService';
import './PokemonDetailPage.css';
import Navbar from "../../components/navbar/navbar.jsx";

const PokemonDetailPage = () => {
    const {id} = useParams(); // Haal het ID uit de URL
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPokemonDetails = async () => {
            try {
                const data = await fetchPokemonById(id);
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getPokemonDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!pokemon) return <p>No Pokémon found.</p>;

    return (
        <div className="pokemon-detail">
            <Navbar/>
            <div
                className={'back-div'}
                onClick={() => window.history.back()}
            >
                <svg className="svg-back" width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 5l-7 7 7 7" stroke="#000" stroke-width="2" fill="none"/>
                </svg>


                <p>Go back</p>
            </div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image"/>
            <p>Description: </p>
            <h2>Information</h2>
            <ul className="pokemon-info-list">
                <li>
                    <strong>Height:</strong> {pokemon.height}
                </li>
                <li>
                    <strong>Weight:</strong> {pokemon.weight}
                </li>
                <li>
                    <strong>Abilities:</strong>
                    <ul>
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index}>{ability}</li>
                        ))}
                    </ul>
                </li>
                <li>
                    <strong>Type:</strong>
                    <ul>
                        {pokemon.type.map((type, index) => (
                            <li key={index}>{type}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>);
};

export default PokemonDetailPage;
