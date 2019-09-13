import React from 'react';

function Weather(props) {

    return (
        <section className='weather-display'>
            <h1>{props.name}</h1>
            <div className="info">
                <i className={`wi ${props.icon}`}/>
                <h1>{props.temp}&deg;</h1>
                <p>{props.desc}</p>
            </div>

        </section>
    );

}

export default Weather