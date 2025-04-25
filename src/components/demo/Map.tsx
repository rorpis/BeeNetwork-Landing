import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Custom marker icons
const mainMarkerIcon = new Icon({
  iconUrl: '/custom-marker.svg',
  iconSize: [35, 57],
  iconAnchor: [17, 57],
});

const mainMarkerLabel = new DivIcon({
  className: 'main-marker-label',
  html: '<div class="bg-white p-3 rounded-lg shadow-lg text-center" style="width: 200px; transform: translateX(-50%) translateY(-120px);"><p class="text-sm font-medium">Click here to view this location</p></div>',
});

const inactiveMarkerIcon = new Icon({
  iconUrl: '/custom-marker-inactive.svg',
  iconSize: [35, 57],
  iconAnchor: [17, 57],
});

interface MapProps {
  onPinClick: () => void;
}

const FORT_LAUDERDALE_COORDS: [number, number] = [26.1224, -80.1373]; // Fort Lauderdale coordinates

// Component to handle map controls
const MapController = forwardRef<{ centerOnPin: () => void }, MapProps>((props, ref) => {
  const map = useMap();
  
  useImperativeHandle(ref, () => ({
    centerOnPin: () => {
      const bounds = map.getBounds();
      const visibleWidth = bounds.getEast() - bounds.getWest();
      // Calculate offset to center within the 60% viewport
      // We need to shift it by 30% of the visible width to center it in the 60% area
      const newLng = FORT_LAUDERDALE_COORDS[1] + (visibleWidth * 0.2);
      
      map.flyTo([FORT_LAUDERDALE_COORDS[0], newLng], map.getZoom(), {
        animate: true,
        duration: 0.5
      });
    }
  }));

  return null;
});

const Map: React.FC<MapProps> = ({ onPinClick }) => {
  const controllerRef = useRef<{ centerOnPin: () => void }>(null);

  const handlePinClick = () => {
    onPinClick();
    // Center the map on pin after click
    controllerRef.current?.centerOnPin();
  };

  // Generate some random nearby coordinates for inactive markers
  const inactiveLocations: [number, number][] = [
    // North area
    [26.1324, -80.1273],
    [26.1424, -80.1173],
    [26.1374, -80.1323],
    
    // South area
    [26.1124, -80.1473],
    [26.1074, -80.1373],
    [26.1174, -80.1423],
    
    // East area
    [26.1224, -80.1173],
    [26.1274, -80.1223],
    [26.1194, -80.1273],
    
    // West area
    [26.1224, -80.1573],
    [26.1274, -80.1523],
    [26.1174, -80.1623],
  ];

  return (
    <MapContainer
      center={FORT_LAUDERDALE_COORDS}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      boxZoom={true}
      keyboard={true}
      zoomControl={true}
    >
      <MapController ref={controllerRef} onPinClick={onPinClick} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Main clickable marker */}
      <Marker 
        position={FORT_LAUDERDALE_COORDS}
        icon={mainMarkerIcon}
        eventHandlers={{
          click: handlePinClick,
        }}
      />
      
      {/* Permanent label for main marker */}
      <Marker
        position={FORT_LAUDERDALE_COORDS}
        icon={mainMarkerLabel}
        interactive={false}
      />

      {/* Inactive markers */}
      {inactiveLocations.map((position, index) => (
        <Marker 
          key={index}
          position={position}
          icon={inactiveMarkerIcon}
        />
      ))}
    </MapContainer>
  );
};

export default Map; 