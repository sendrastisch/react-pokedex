import React from 'react';
import Searchbar from "../searchbar/searchbar.jsx";
import './sortbar.css';
import SortDropdown from "../sortDropdown/sortDropdown.jsx";
import TypeSort from "../typeSort/typeSort.jsx";
import GenSort from "../genSort/genSort.jsx";

const Sortbar = ({setSearchTerm, sortOption, setSortOption, types, selectedType, setSelectedType, gens, setSelectedGen, selectedGen}) => {
    return (
        <div>
            <div className={`sortbar-parent-div`}>
                <p className={`logo`}>Pokéflex</p>
                <Searchbar setSearchTerm={setSearchTerm}/>
                <SortDropdown sortOption={sortOption} setSortOption={setSortOption}/>
            </div>
            <TypeSort types={types} setSelectedType={setSelectedType} selectedType={selectedType}/>
            <GenSort gens={gens} setSelectedGen={setSelectedGen} selectedGen={selectedGen}/>
        </div>
    );
};

export default Sortbar;
