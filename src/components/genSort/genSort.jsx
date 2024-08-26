import React, { useEffect, useState } from 'react';
import './genSort.css';
const GenSort = ({gens, selectedGen, setSelectedGen}) => {

    useEffect(() => {

    }, []);

    return (
        <div className="gensort-parent-div">
            <p className="gensort-label">GENERATION</p>
            <div className="gensort">
                {gens.length > 0 ? (
                    gens.map(gen => (
                        <div
                            key={gen.id}
                            className={`gensort-item ${selectedGen === gen.name ? 'selected' : ''}`}
                            onClick={() => selectedGen === gen.name ? setSelectedGen("") : setSelectedGen(gen.name)}
                        >
                            {gen.name[0].toUpperCase() + gen.name.slice(1)}
                        </div>
                    ))
                ) : (
                    <p>No gens available</p>
                )}
            </div>
        </div>
    );
};

export default GenSort;
