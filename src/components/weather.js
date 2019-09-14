import React from 'react';

function Weather(props) {
    return (
        <section className='weather-display'>
            <h1 className='weather-city'>{props.name}</h1>
            <div className="weather-info">
                <i className={`wi ${props.icon}`}/>
                <div className="right-info">
                    <h1 className='weather-temp'>{props.temp}&deg;</h1>
                    <p className='weather-desc'>{props.desc}</p>
                </div>

            </div>

        </section>
    );
}

export default Weather