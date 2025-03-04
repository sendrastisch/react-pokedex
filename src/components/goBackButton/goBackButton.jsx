import React from "react";
import './backbutton.css';

const GoBackButton = () => {

    return (
        <div
            className={'back-div'}
            onClick={() => window.history.back()}
        >
            <svg className="svg-back" width="40px" height="40px" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M16 5l-7 7 7 7" stroke="#000" strokeWidth="2" fill="none"/>
            </svg>
            <p>Go back</p>
        </div>
    );
};

export default GoBackButton;
