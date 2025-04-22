
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  zoom = 13,
  points = [],
  onDriverSelect
}) => {
  const createCustomIcon = (type: 'rider' | 'driver', status?: string) => {
    const color = type === 'rider' 
      ? '#007cff'
      : status === 'available' 
        ? '#cee6ff'
        : status === 'selected'
          ? '#007cff'
          : '#b5b5b5';

    return L.divIcon({
      className: 'custom-icon',
      html: `
        <div style="
          width: 24px;
          height: 24px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.17);
          cursor: ${type === 'driver' && status === 'available' ? 'pointer' : 'default'};
        "></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={true as any}
        // Type casting to satisfy react-leaflet MapContainerProps typings
      >
        <ZoomControl position="topright" />
        <TileLayer
          // @ts-ignore: attribution is a valid prop, but types can be strict
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={createCustomIcon(point.type, point.status) as any}
            eventHandlers={{
              click: () => {
                if (point.type === 'driver' && point.status === 'available') {
                  onDriverSelect?.(point.id);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2 text-sm">
                <div className="font-medium">
                  {point.type === 'rider' ? 'Pickup Location' : 'Driver'}
                </div>
                <div className="text-muted-foreground">
                  {point.status ? `Status: ${point.status.charAt(0).toUpperCase() + point.status.slice(1)}` : ''}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md space-y-2 z-[1000]">
        <div className="text-sm font-medium mb-2">Map Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-xs">Your Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#cee6ff' }}></div>
          <span className="text-xs">Available Drivers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#b5b5b5' }}></div>
          <span className="text-xs">Busy Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default Map;

