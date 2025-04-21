
import React, { useEffect, useRef, useState } from 'react';

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
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 14,
  points = [],
  onDriverSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // In a real implementation, this would initialize an actual map library
    // like Google Maps, Mapbox, Leaflet, etc.
    if (mapRef.current) {
      // Simulate map loading
      const timer = setTimeout(() => {
        setIsMapLoaded(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-slate-200" 
        style={{ 
          backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.006&zoom=14&size=800x600&scale=2&maptype=roadmap&style=feature:all|element:labels|visibility:on&style=feature:administrative|element:geometry|visibility:off&style=feature:road|element:geometry|color:0xffffff&key=YOUR_KEY_HERE')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Loading indicator */}
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="animate-pulse-gentle text-primary">Loading map...</div>
          </div>
        )}
        
        {/* Map Points */}
        {isMapLoaded && points.map(point => (
          <div 
            key={point.id}
            className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer
              ${point.type === 'driver' 
                ? point.status === 'available' 
                  ? 'bg-hykr-green text-white' 
                  : point.status === 'selected'
                    ? 'bg-primary text-white ring-2 ring-white' 
                    : 'bg-gray-400 text-white' 
                : 'bg-primary text-white'}
              ${point.type === 'driver' && 'hover:scale-110 transition-transform'}
            `}
            style={{
              // Randomize positions for demo purposes
              top: `${Math.random() * 60 + 20}%`,
              left: `${Math.random() * 60 + 20}%`,
            }}
            onClick={() => {
              if (point.type === 'driver' && point.status === 'available' && onDriverSelect) {
                onDriverSelect(point.id);
              }
            }}
          >
            {point.type === 'driver' ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            )}
          </div>
        ))}
      </div>
      
      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
      
      {/* Legend */}
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
