
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Brand colors
const HYKR_BLUE = "#007cff";
const HYKR_BLUE_LIGHT = "#cee6ff";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Define custom map container props type that includes center
interface CustomMapProps extends MapContainerProps {
  center?: [number, number];
  attributionControl?: boolean;
}

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
  // Define custom icons for legend
  const createCustomIcon = (type: 'rider' | 'driver', status?: string) => {
    let color = "#b5b5b5"; // Default: busy driver
    if (type === 'rider') color = HYKR_BLUE;
    if (type === 'driver') {
      if (status === 'available') color = HYKR_BLUE_LIGHT;
      if (status === 'selected') color = HYKR_BLUE;
    }
    return L.divIcon({
      className: '',
      html: `
        <div style="
          width: 24px;
          height: 24px;
          background: ${color};
          border: 2.5px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.14);
        "></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng] as any}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={true as any}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng] as any}
            icon={createCustomIcon(point.type, point.status)}
            eventHandlers={{
              click: () => {
                if (point.type === 'driver' && point.status === 'available') {
                  onDriverSelect?.(point.id);
                }
              },
            } as any}
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

      {/* Brand style map legend (floating as overlay) */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow p-3 z-[1000] min-w-[140px]">
        <div className="font-semibold text-[15px] text-[#222] mb-2">Map Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full" style={{ background: HYKR_BLUE }}></span>
          <span className="text-[13px] text-[#222]">Your Location</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full" style={{ background: HYKR_BLUE_LIGHT }}></span>
          <span className="text-[13px] text-[#222]">Available Drivers</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#b5b5b5]"></span>
          <span className="text-[13px] text-[#222]">Busy Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
