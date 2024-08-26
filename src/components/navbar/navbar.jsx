import React from 'react';
import Searchbar from "../searchbar/searchbar.jsx";
import './navbar.css';
import SortDropdown from "../sortDropdown/sortDropdown.jsx";
import TypeSort from "../typeSort/typeSort.jsx";
import GenSort from "../genSort/genSort.jsx";
{/* Hey ik weet dat dit niet echt een navbar is, maar soort van wel, dus ik noem het navbar */}

const Navbar = ({setSearchTerm, sortOption, setSortOption, types, selectedType, setSelectedType, gens, setSelectedGen, selectedGen}) => {
    return (
        <div>
            <div className={`navbar-parent-div`}>
                <Searchbar setSearchTerm={setSearchTerm}/>
                <SortDropdown sortOption={sortOption} setSortOption={setSortOption}/>
            </div>
            <TypeSort types={types} setSelectedType={setSelectedType} selectedType={selectedType}/>
            <GenSort gens={gens} setSelectedGen={setSelectedGen} selectedGen={selectedGen}/>
        </div>
    );
};

export default Navbar;
