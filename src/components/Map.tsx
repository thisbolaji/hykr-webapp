
import React, { useEffect, useRef } from 'react';
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
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN'; // Replace with your Mapbox public token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: zoom,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    return () => {
      map.current?.remove();
    };
  }, [center.lat, center.lng, zoom]);

  // Update markers when points change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    points.forEach(point => {
      const color = point.type === 'rider' 
        ? '#9b87f5' // primary color for rider
        : point.status === 'available' 
          ? '#22c55e' // green for available driver
          : point.status === 'selected'
            ? '#9b87f5' // primary color for selected driver
            : '#9ca3af'; // gray for busy driver

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.background = color;
      el.style.border = '2px solid white';
      el.style.cursor = point.type === 'driver' && point.status === 'available' ? 'pointer' : 'default';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .addTo(map.current);

      if (point.type === 'driver' && point.status === 'available') {
        el.addEventListener('click', () => onDriverSelect?.(point.id));
      }

      markers.current.push(marker);
    });
  }, [points, onDriverSelect]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />

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
