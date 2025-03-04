import React, {useEffect, useState} from 'react';
import Searchbar from "../searchbar/searchbar.jsx";
import './navbar.css';
import SortDropdown from "../sortDropdown/sortDropdown.jsx";
import TypeSort from "../typeSort/typeSort.jsx";
import GenSort from "../genSort/genSort.jsx";
import { useLocation } from 'react-router-dom';

/**
 * State: isListPage
 * - Houdt bij of de gebruiker op de lijstpagina ("/") is.
 * - Wordt gebruikt om te bepalen of de Searchbar zichtbaar moet zijn.
 */

/**
 * State: isInDOM
 * - Bepaalt of de Searchbar nog in de DOM staat.
 * - Searchbar blijft in de DOM staan tijdens de fade-out animatie en wordt daarna verwijderd.
 */

/**
 * Function: handleFadeOutComplete
 * - Wordt aangeroepen nadat de fade-out animatie klaar is.
 * - Verwijdert de Searchbar definitief uit de DOM door `isInDOM = false` te zetten.
 */

const Navbar = ({setSearchTerm, sortOption, setSortOption, types, selectedType, setSelectedType, gens, setSelectedGen, selectedGen, isLoading}) => {
    const location = useLocation();
    const [isListPage, setIsListPage] = useState(location.pathname === '/');
    const [isInDOM, setIsInDOM] = useState(isListPage);

    useEffect(() => {
        if (location.pathname === '/') {
            setIsListPage(true);
            setIsInDOM(true);
        } else {
            setIsListPage(false)
        }
    }, [location.pathname]);

    const handleFadeOutComplete = () => {
        setIsInDOM(false);
    };

    return (
        <div>
            <div className={`sortbar-parent-div`}>
                <p className={`logo`}>PokéFlex</p>
                {!isLoading && isInDOM ? <Searchbar setSearchTerm={setSearchTerm} isVisible={isListPage} onFadeOutComplete={handleFadeOutComplete} /> : null}
                {!isLoading && isInDOM ? <SortDropdown sortOption={sortOption} setSortOption={setSortOption} isVisible={isListPage} onFadeOutComplete={handleFadeOutComplete} /> : null}
            </div>
            {!isLoading && isInDOM ? <TypeSort types={types} setSelectedType={setSelectedType} selectedType={selectedType} isVisible={isListPage} onFadeOutComplete={handleFadeOutComplete} /> : null}
            {!isLoading && isInDOM ? <GenSort gens={gens} setSelectedGen={setSelectedGen} selectedGen={selectedGen} isVisible={isListPage} onFadeOutComplete={handleFadeOutComplete}  /> : null}
        </div>
    );
};

export default Navbar;


