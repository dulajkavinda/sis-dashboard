import React from 'react';
import icon from '../images/check-circle.gif'

const Done = () => {
    return (
        <div className="App">
            <img src={icon} alt=""></img>
            <h4 style={{marginTop:20}}>Your answers have been saved successfully. Please notify your interviewer.</h4>
        </div>
    );
};

export default Done;