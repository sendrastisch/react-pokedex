import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPokemonById} from '../../services/pokemonService';
import GoBackButton from "../../components/goBackButton/goBackButton.jsx";
import './pokemondetailpage.css';
import pokeball from "../../assets/images/pokeball.png";
import Loader from "../../components/loader/loader.jsx";

const PokemonDetailPage = () => {
    const {id} = useParams();
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

    const getBackgroundColor = (type) => {
        switch (type) {
            case 'normal': return '#eae9dd';
            case 'fire': return '#fdedd7';
            case 'water': return '#dde5fc';
            case 'grass': return '#e0f4d3';
            case 'electric': return '#fdf8c4';
            case 'ice': return '#dbf2f1';
            case 'ground': return '#f5edd0';
            case 'flying': return '#eeebfc';
            case 'poison': return '#f8edfa';
            case 'fighting': return '#fde4e3';
            case 'psychic': return '#ffe4e9';
            case 'dark': return '#e7e4da';
            case 'rock': return '#f1f1d0';
            case 'bug': return '#f7f9ce';
            case 'ghost': return '#f2eff8';
            case 'steel': return '#ecedf3';
            case 'dragon': return '#eae8ff';
            case 'fairy': return '#fde6ee';
            default: return '#FFFFFF';
        }
    };

    if (loading) return <Loader/>;
    if (error) return <p>Error: {error.message}</p>;
    if (!pokemon) return <p>No Pokémon found.</p>;

    const backgroundColor = getBackgroundColor(pokemon.type[0]);

    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div className="pokemon-detail">
            <GoBackButton/>

            <div className="static-banner" style={{backgroundColor}}>
                <div className="text-content">
                    <h1 className="detail-header">{capitalizeFirstLetter(pokemon.name)}</h1>
                    <p className="description-p">{pokemon.description}</p>
                </div>
                <img className="pokeball-img-detail" src={pokeball} alt="pokeball"/>
            </div>

            <div className="pokemon-img">
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image"/>
            </div>

            <div className={`moves-and-info-container`}>
                <div>
                    <h2 className={`moves-header`}>Moves</h2>
                    {pokemon.moves.length > 0 ? (
                        <table className="pokemon-moves-table">
                            <thead>
                            <tr>
                                <th>Move Name</th>
                                <th>Level Learned</th>
                                <th>Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pokemon.moves.map((move, index) => (
                                <tr key={index}>
                                    <td>{capitalizeFirstLetter(move.name)}</td>
                                    <td>{move.level}</td>
                                    <td>{capitalizeFirstLetter(move.type)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>


                    ) : (
                        <p>No moves available.</p>
                    )}
                </div>

                <div className={`information-container`}>
                    <h2>Information</h2>
                    <ul className="pokemon-info-list">
                        <li><strong>ID</strong> {pokemon.id}</li>
                        <li><strong>Height</strong> {pokemon.height * 10} cm</li>
                        <li><strong>Weight</strong> {(pokemon.weight / 10)} kg</li>
                        <li><strong>HP</strong> {pokemon.stats.hp}</li>
                        <li><strong>Attack</strong> {pokemon.stats.attack}</li>
                        <li><strong>Defense</strong> {pokemon.stats.defense}</li>
                        <li><strong>Special Attack</strong> {pokemon.stats.specialAttack}</li>
                        <li><strong>Special Defense</strong> {pokemon.stats.specialDefense}</li>
                        <li><strong>Speed</strong> {pokemon.stats.speed}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailPage;
