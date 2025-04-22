
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'rider' | 'driver';
  status?: 'available' | 'busy' | 'selected';
}

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  points?: MapPoint[];
  onDriverSelect?: (driverId: string) => void;
}

const Map: React.FC<MapProps> = ({ 
  center = { lat: 37.0902, lng: -95.7129 },
  zoom = 4,
  points = [],
  onDriverSelect
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your Google Maps API key
  });

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
        <div className="animate-pulse-gentle text-primary">Loading map...</div>
      </div>
    );
  }

  const createMarkerIcon = (type: 'rider' | 'driver', status?: 'available' | 'busy' | 'selected') => {
    const color = type === 'rider' 
      ? '#9b87f5' // primary color for rider
      : status === 'available' 
        ? '#22c55e' // green for available driver
        : status === 'selected'
          ? '#9b87f5' // primary color for selected driver
          : '#9ca3af'; // gray for busy driver

    return {
      path: type === 'driver' 
        ? 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
        : 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 1.5,
    };
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ lightness: 20 }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ hue: '#00aaff' }, { lightness: 50 }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true,
          scrollwheel: true,
          gestureHandling: 'greedy'
        }}
      >
        {points.map((point) => (
          <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            icon={createMarkerIcon(point.type, point.status)}
            onClick={() => {
              if (point.type === 'driver' && point.status === 'available') {
                onDriverSelect?.(point.id);
              }
            }}
          />
        ))}
      </GoogleMap>

      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-hykr-green mr-2"></div>
          <span>Available Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
