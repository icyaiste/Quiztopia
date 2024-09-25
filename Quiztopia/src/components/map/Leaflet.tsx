import { useState, useEffect } from 'react';
import leaflet, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Leaflet.css';

interface Position {
    latitude: number;
    longitude: number;
}

interface LeafletProps {
    setPosition: (position: Position | undefined) => void;
}

function Leaflet({ setPosition }: LeafletProps) {
    const [myLocation, setMyLocation] = useState<GeolocationCoordinates>();
    const [map, setMap] = useState<Map>();



    function getMyLocation() {
        if ('geolocation' in navigator && !myLocation?.latitude) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation(position.coords);
            }, (error) => {
                console.error("Error fetching location:", error);
            });
        }
    }

    useEffect(() => {  // Effect to fetch location only once on component mount
        getMyLocation();
    }, []);

    useEffect(() => {
        if (myLocation && !map) {
            // Initialize the map
            const myMap = leaflet.map('map').setView([myLocation.latitude, myLocation.longitude], 15);

            leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(myMap);

            const marker = leaflet.marker([myLocation.latitude, myLocation.longitude]).addTo(myMap);
            marker.bindPopup('You are here!').openPopup();

            myMap.on('click', (event) => {
                const { lat, lng } = event.latlng;
                setPosition({ latitude: lat, longitude: lng }); // Update position in the parent component
                leaflet.marker([lat, lng]).addTo(myMap); // Add marker on map with a click
            });
            setMap(myMap);
        }
    }, [myLocation, setPosition]);

    return (
        <section id='map'></section>
    )
}

export default Leaflet
