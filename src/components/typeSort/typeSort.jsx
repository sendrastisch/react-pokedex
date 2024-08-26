import React from 'react';
import './typeSort.css';

const TypeSort = ({ types, setSelectedType, selectedType }) => {

    return (
        <div className="typesort-parent-div">
            <p className="typesort-label">TYPE</p>
            <div className="typesort">
                {types.length > 0 ? (
                    types.map(type => (
                        <div
                            key={type.id}
                            className={`typesort-item ${selectedType === type.name ? 'selected' : ''}`}
                            onClick={() => selectedType === type.name ? setSelectedType("") : setSelectedType(type.name)}
                        >
                            {type.name[0].toUpperCase() + type.name.slice(1)}
                        </div>
                    ))
                ) : (
                    <p>No types available</p>
                )}
            </div>
        </div>
    );
};

export default TypeSort;
