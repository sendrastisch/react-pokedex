// PokemonList.js
import React, { useEffect, useRef } from 'react';
import PokemonItem from '../pokeItem/pokemonItem';
import './pokemonList.css';
import ScrollToTopButton from "../scrollToTopButton/scrollToTopButton.jsx";
import ScrollMagic from 'scrollmagic';

const PokemonList = ({ pokemon }) => {
    const listRef = useRef(null); // Ref om de lijst te refereren

    useEffect(() => {
        const controller = new ScrollMagic.Controller(); // ScrollMagic controller initialiseren

        if (listRef.current) {
            const items = listRef.current.querySelectorAll('.item'); // Selecteer alle Pokémon-items

            items.forEach((item) => {
                // Voor elk item een ScrollMagic scène maken
                new ScrollMagic.Scene({
                    triggerElement: item, // Trigger wanneer het item in beeld komt
                    triggerHook: 0.9, // Start de animatie als het item bijna in beeld is
                    reverse: false, // Animatie slechts één keer
                })
                    .setClassToggle(item, 'visible') // Voeg de class 'visible' toe wanneer getriggerd
                    .addTo(controller);
            });
        }

        // Cleanup functie om memory leaks te voorkomen
        return () => {
            controller.destroy(true);
        };
    }, [pokemon]); // Effect opnieuw uitvoeren wanneer de lijst van Pokémon wijzigt

    return (
        <div>
            <ul className="pokemon-list" ref={listRef}>
                {pokemon.length > 0 ? (
                    pokemon.map((p) => (
                        <li key={p.id} className={`item`}>
                            <PokemonItem
                                id={p.id}
                                name={p.name}
                                image={p.image}
                                type={p.type}
                            />
                        </li>
                    ))
                ) : (
                    <p>No Pokémon found.</p>
                )}
            </ul>
            <ScrollToTopButton />
        </div>
    );
};

export default PokemonList;
