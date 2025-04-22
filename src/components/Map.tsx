
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN'; // Replace with your Mapbox public token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: zoom,
      pitchWithRotate: false,
      attributionControl: false
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    );

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    return () => {
      Object.values(markers.current).forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  // Update markers when points change
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Remove existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add new markers
    points.forEach(point => {
      const el = document.createElement('div');
      el.className = `w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
        ${point.type === 'driver' 
          ? point.status === 'available' 
            ? 'bg-hykr-green text-white' 
            : point.status === 'selected'
              ? 'bg-primary text-white ring-2 ring-white' 
              : 'bg-gray-400 text-white' 
          : 'bg-primary text-white'}
        ${point.type === 'driver' && 'hover:scale-110 transition-transform'}
      `;

      // Add icon
      el.innerHTML = point.type === 'driver' 
        ? `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>`
        : `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>`;

      if (point.type === 'driver' && point.status === 'available') {
        el.addEventListener('click', () => onDriverSelect?.(point.id));
      }

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([point.lng, point.lat])
        .addTo(map.current!);

      markers.current[point.id] = marker;
    });
  }, [points, isMapLoaded]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="animate-pulse-gentle text-primary">Loading map...</div>
        </div>
      )}
      
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
