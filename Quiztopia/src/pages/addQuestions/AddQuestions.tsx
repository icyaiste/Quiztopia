import React from 'react';
import { useState } from 'react';
import Leaflet from '../../components/Leaflet';

function AddQuestions() {
    const [position, setPosition] = useState<GeolocationCoordinates>();

    function getPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition(position.coords);
            });
        }
    }
    if (position?.latitude) {
        // console.log('Position is set')
    }
    getPosition();


    

    return (
        <main>
            <Leaflet />
        </main>
    )
}

export default AddQuestions;
