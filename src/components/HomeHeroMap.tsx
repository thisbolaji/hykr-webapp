
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, MapContainerProps } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Brand colors
const HYKR_BLUE = "#007cff";
const HYKR_BLUE_LIGHT = "#cee6ff";
const HYKR_BLACK = "#000000";

// Map base coordinates (NYC for demo)
const baseLat = 40.7128;
const baseLng = -74.006;
const NUM_CARS = 6;

function randomWobble(num: number) {
  // returns small random offset for micro position changes
  return (Math.random() - 0.5) * 0.006 * num;
}

const createCarIcon = () =>
  L.divIcon({
    html: `<div style="
      background: ${HYKR_BLUE_LIGHT};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2.5px solid ${HYKR_BLUE};
      box-shadow: 0 2px 4px rgba(0,0,0,0.12);
      "></div>`,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

// Define custom map container props type that includes center
interface CustomMapProps extends MapContainerProps {
  center?: [number, number];
  attributionControl?: boolean;
}

// Define custom tile layer props type
interface CustomTileLayerProps {
  url: string;
  attribution?: string;
}

// Define custom marker props type
interface CustomMarkerProps {
  position: [number, number];
  icon?: L.DivIcon | L.Icon;
  eventHandlers?: any;
}

const HomeHeroMap: React.FC = () => {
  const [cars, setCars] = useState(
    Array.from({ length: NUM_CARS }, (_, i) => ({
      id: i,
      lat: baseLat + randomWobble(i + 1),
      lng: baseLng + randomWobble(i + 1),
      dir: Math.random() * 360,
    }))
  );

  // Animate: every 1.2s move cars randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setCars((prev) =>
        prev.map((car, i) => {
          // Random walk
          const direction = car.dir + (Math.random() - 0.5) * 45;
          const lat = car.lat + 0.0008 * Math.sin((direction * Math.PI) / 180);
          const lng = car.lng + 0.0008 * Math.cos((direction * Math.PI) / 180);
          return {
            ...car,
            lat,
            lng,
            dir: direction,
          };
        })
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-56 md:w-[360px] md:h-[260px] rounded-xl shadow-lg overflow-hidden border bg-white relative">
      <MapContainer
        center={[baseLat, baseLng] as any}
        zoom={14}
        className="w-full h-full"
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        keyboard={false}
        boxZoom={false}
        touchZoom={false}
        style={{ filter: "grayscale(20%)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {cars.map((car) => (
          <Marker
            key={car.id}
            position={[car.lat, car.lng] as any}
            icon={createCarIcon()}
          />
        ))}
      </MapContainer>
      {/* Legend overlay, floating in top left */}
      <div className="absolute top-3 left-3 bg-white rounded-lg shadow p-3 z-[1000] min-w-[140px] pointer-events-none">
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

export default HomeHeroMap;
