import React from 'react';

function Weather(props){

        return (
            <section className='weather-display'>
                <i className='wi wi-day-sunny'/>
                <h1>{props.temp}</h1>
                <p>{props.tempMax}</p>
                <p>{props.tempMin}</p>



            </section>
        );

}

export default Weather