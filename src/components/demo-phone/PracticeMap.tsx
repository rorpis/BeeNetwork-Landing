import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Use local purple marker icon
const PurpleIcon = L.icon({
  iconUrl: '/map-icons/marker-icon-purple.png',
  shadowUrl: '/map-icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface PracticeMapProps {
  className?: string;
}

const PracticeMap: React.FC<PracticeMapProps> = ({ className }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Move pin slightly north (up)
    const pinLatLng: [number, number] = [40.7138, -74.0060];
    // Move blue circle about two blocks south of the pin
    const userLatLng: [number, number] = [40.7118, -74.0060];

    // Initialize map with zoom controls disabled and higher zoom level
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(pinLatLng, 16);

    mapRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(map);

    // Add purple marker for the medical center
    L.marker(pinLatLng, { icon: PurpleIcon }).addTo(map);

    // Add blue circle for user position
    L.circle(userLatLng, {
      color: '#2563eb',
      fillColor: '#2563eb',
      fillOpacity: 0.3,
      radius: 40
    }).addTo(map);
    L.circleMarker(userLatLng, {
      color: '#2563eb',
      fillColor: '#2563eb',
      fillOpacity: 1,
      radius: 8
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default PracticeMap; 