
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
  const popups = useRef<mapboxgl.Popup[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: zoom,
      pitch: 45,
      bearing: 0,
    });

    // Add navigation and zoom controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add fullscreen control
    map.current.addControl(
      new mapboxgl.FullscreenControl(),
      'top-right'
    );

    // Enable terrain if available
    map.current.on('style.load', () => {
      map.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      map.current?.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
    });

    return () => {
      popups.current.forEach(popup => popup.remove());
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [center.lat, center.lng, zoom]);

  // Update markers when points change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers and popups
    markers.current.forEach(marker => marker.remove());
    popups.current.forEach(popup => popup.remove());
    markers.current = [];
    popups.current = [];

    // Add new markers with enhanced interactivity
    points.forEach(point => {
      const color = point.type === 'rider' 
        ? '#9b87f5'
        : point.status === 'available' 
          ? '#22c55e'
          : point.status === 'selected'
            ? '#9b87f5'
            : '#9ca3af';

      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker transition-all duration-300 hover:scale-125';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.background = color;
      el.style.border = '2px solid white';
      el.style.cursor = point.type === 'driver' && point.status === 'available' ? 'pointer' : 'default';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

      // Create popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
        className: 'rounded-lg shadow-lg'
      })
      .setHTML(`
        <div class="p-2 text-sm">
          <div class="font-medium">${point.type === 'rider' ? 'Pickup Location' : 'Driver'}</div>
          <div class="text-muted-foreground">
            ${point.status ? `Status: ${point.status.charAt(0).toUpperCase() + point.status.slice(1)}` : ''}
          </div>
        </div>
      `);

      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .addTo(map.current!);

      // Add hover events for popup
      el.addEventListener('mouseenter', () => {
        marker.setPopup(popup);
        popup.addTo(map.current!);
      });

      el.addEventListener('mouseleave', () => {
        popup.remove();
      });

      // Add click event for available drivers
      if (point.type === 'driver' && point.status === 'available') {
        el.addEventListener('click', () => {
          // Fly to the clicked point with animation
          map.current?.flyTo({
            center: [point.lng, point.lat],
            zoom: 14,
            duration: 1500,
            essential: true
          });
          
          onDriverSelect?.(point.id);
        });
      }

      markers.current.push(marker);
      popups.current.push(popup);
    });
  }, [points, onDriverSelect]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />

      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md space-y-2">
        <div className="text-sm font-medium mb-2">Map Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-xs">Your Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
          <span className="text-xs">Available Drivers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#9ca3af]"></div>
          <span className="text-xs">Busy Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
