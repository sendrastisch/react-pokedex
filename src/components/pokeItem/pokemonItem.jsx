import React from 'react';
import { Link } from 'react-router-dom';
import './pokemonItem.css';
import pokeball from '../../assets/images/pokeball.png';

const PokemonItem = ({ id, name, image, type }) => {

    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const getBackgroundColor = (type) => {
        switch (type) {
            case 'normal':
                return '#eae9dd';
            case 'fire':
                return '#fdedd7';
            case 'water':
                return '#dde5fc';
            case 'grass':
                return '#e0f4d3';
            case 'electric':
                return '#fdf8c4';
            case 'ice':
                return '#dbf2f1';
            case 'ground':
                return '#f5edd0';
            case 'flying':
                return '#eeebfc';
            case 'poison':
                return '#f8edfa';
            case 'fighting':
                return '#fde4e3';
            case 'psychic':
                return '#ffe4e9';
            case 'dark':
                return '#e7e4da';
            case 'rock':
                return '#f1f1d0';
            case 'bug':
                return '#f7f9ce';
            case 'ghost':
                return '#f2eff8';
            case 'steel':
                return '#ecedf3';
            case 'dragon':
                return '#eae8ff';
            case 'fairy':
                return '#fde6ee';
            default:
                return '#FFFFFF';
        }
    };

    const backgroundColor = getBackgroundColor(type[0]);

    return (
        <Link to={`/pokemon/${id}`} className="pokemon-item-link">
            <div className={'container-item'} style={{ backgroundColor }}>
                <div className={`image-div`}>
                    <img className={'pokemon-img'} src={image} alt={name} />
                    <img className={'pokeball-img'} src={pokeball} alt={"pokeball"} />
                </div>
                <div className="name-id-div">
                    <p>#{id}</p>
                    <p className={`name`}>{capitalizeFirstLetter(name)}</p>
                    <div className={'type-div'}>
                        {type.map((type, index) => (
                            <p
                                key={index}
                                style={{ backgroundColor: getBackgroundColor(type) }}
                                className={`type-p`}
                            >
                                {capitalizeFirstLetter(type)}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PokemonItem;
