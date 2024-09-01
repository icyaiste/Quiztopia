import { useState, useEffect, useRef } from 'react';
import leaflet, { Map } from 'leaflet';
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
    const mapRef = useRef<HTMLDivElement>(null);

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
        if (myLocation?.latitude && !map && mapRef.current) {
            // Ensure the map container has size
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                console.log('mapContainer not found');
                return;
            }

            // setTimeout(() => {
            const myMap = leaflet.map(mapRef.current).setView([myLocation.latitude, myLocation.longitude], 15);
            leaflet
                .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                })
                .addTo(myMap);
            const marker = leaflet.marker([myLocation.latitude, myLocation.longitude]).addTo(myMap);
            marker.bindPopup('You are here!').openPopup();

            // Force map to recalculate its size
            myMap.invalidateSize();
            setMap(myMap);

            // myMap.on('click', function (event) { // Add click event listener to the map
            //     const { lat, lng } = event.latlng;
            //     setPosition({ latitude: lat, longitude: lng });// Update position in the parent component
            //     leaflet.marker([lat, lng]).addTo(myMap); // Add marker on map with a click
            // });
            //     }, 300);
        }

    }, [myLocation, map, setPosition]);

    useEffect(() => {
        if ('geolocation' in navigator && !myLocation?.latitude) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation(position.coords);
            }, (error) => {
                console.error("Error fetching location:", error);
            });
        }
    }, [myLocation]);
    return (
        <section ref={mapRef} className='mapy'></section>
    )
}

export default Leaflet
