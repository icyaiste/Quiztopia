import { useState, useEffect } from 'react';
import leaflet, { Map } from 'leaflet';
import './leaflet.css';

function Leaflet() {
    const [myLocation, setMyLocation] = useState<GeolocationCoordinates>();
    const [map, setMap] = useState<Map>();

    function getMyLocation() {
        if ('geolocation' in navigator && !myLocation?.latitude) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation(position.coords);
            });
        }
    }

    useEffect(() => {
        if (!myLocation?.latitude) {
            getMyLocation();
        }
    }, []);

    useEffect(() => {
        if (myLocation?.latitude && !map) {
            const myMap = leaflet.map('map').setView([myLocation.latitude, myLocation.longitude], 15);
            setMap(myMap);
        }
    }, [myLocation]);

    useEffect(() => {
        if (map && myLocation) {
            leaflet
                .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                })
                .addTo(map);
        }
    }, [map]);

    return (
        <section id='map'></section>
    )

}

export default Leaflet
