import React, {useEffect, useState} from 'react';
import './searchbar.css';

const Searchbar = ({setSearchTerm, isVisible, onFadeOutComplete}) => {
    const [term, setTerm] = useState("");
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!isVisible) {
            setFadeOut(true);
            setTimeout(() => {
                onFadeOutComplete();
            }, 500);
        } else {
            setFadeOut(false);
        }
    }, [isVisible, onFadeOutComplete]);

    //on dismount reset searchterm
    useEffect(() => {
        return () => {
            setSearchTerm('');
        };
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setTerm(value);
        setSearchTerm(value);
    };

    return (
        <div
            className={`input-container ${fadeOut ? "fade-out" : ""}`}
        >
            <input type="text" placeholder="Search Pokémon" value={term} onChange={handleInputChange}/>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <circle cx="10" cy="10" r="7" stroke="#E04958" strokeWidth="2" fill="none"/>
                <line x1="16" y1="16" x2="22" y2="22" stroke="#E04958" strokeWidth="2"/>
            </svg>
        </div>


    );
};

export default Searchbar;
