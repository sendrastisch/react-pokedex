import React from 'react';
import './sortDropdown.css';

const SortDropdown = ({ sortOption, setSortOption }) => {
    const handleChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="dropdown-container">
            <p className="dropdown-label">SORT BY:</p>
            <div className="dropdown">
                <select value={sortOption} onChange={handleChange}>
                    <option value="no-ascending">No. ascending</option>
                    <option value="no-descending">No. descending</option>
                    <option value="name-ascending">Name ascending (A to Z)</option>
                    <option value="name-descending">Name descending (Z to A)</option>
                    <option value="random">Randomizer</option>
                </select>
            </div>
        </div>
    );
};

export default SortDropdown;
