
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, MarkerProps } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CarFront } from "lucide-react";

// Brand colors
const HYKR_BLUE = "#007cff";
const HYKR_BLUE_LIGHT = "#cee6ff";

// Map base coordinates (NYC for demo)
const baseLat = 40.7128;
const baseLng = -74.006;
const NUM_CARS = 6;

// Helper: tiny random walk offset
function randomWobble(num: number) {
  return (Math.random() - 0.5) * 0.006 * num;
}

// Make a custom SVG car icon, pointing in direction (deg)
function createCarIcon(dirDeg: number) {
  // We'll inline an SVG for a car here and rotate via transform.
  const svg = encodeURIComponent(`
    <svg width="24" height="24" fill="none" stroke="${HYKR_BLUE}" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(${dirDeg}deg)">
      <rect x="5" y="10" width="14" height="7" rx="2" fill="${HYKR_BLUE_LIGHT}" stroke="${HYKR_BLUE}"/>
      <rect x="9.5" y="8" width="5" height="5" rx="1.2" fill="white" stroke="${HYKR_BLUE}"/>
      <ellipse cx="7" cy="18" rx="2" ry="2" fill="#818cf8"/>
      <ellipse cx="17" cy="18" rx="2" ry="2" fill="#818cf8"/>
      <rect x="9.5" y="7.2" width="5" height="2.2" rx="1" fill="${HYKR_BLUE}"/>
    </svg>
  `);
  return L.divIcon({
    html: `<div style="transform: rotate(${dirDeg}deg);"><img src="data:image/svg+xml,${svg}" width="32" height="32"/></div>`,
    className: "",
    iconSize: [32, 32],  // larger for clarity at 2x map size
    iconAnchor: [16, 16],
  });
}

// Your location: blue dot (reuse car for now)
const createUserIcon = () =>
  L.divIcon({
    html: `<div style="
      background: ${HYKR_BLUE};
      width: 18px; height: 18px;
      border-radius: 50%;
      border: 2.5px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.13);
      "></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

const HomeHeroMap: React.FC = () => {
  // Car array: always 6, each has lat/lng/dir
  const [cars, setCars] = useState(
    Array.from({ length: NUM_CARS }, (_, i) => ({
      id: i,
      lat: baseLat + randomWobble(i + 1),
      lng: baseLng + randomWobble(i + 1),
      dir: Math.random() * 360, // direction in deg
    }))
  );

  // Animate: every 1.2s move cars randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setCars((prev) =>
        prev.map((car, i) => {
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

  // 2x size: CSS width/height
  return (
    <div className="w-full h-[1024px] md:w-[1440px] md:h-[1040px] rounded-xl shadow-lg overflow-hidden border bg-white relative">
      <MapContainer
        center={[baseLat, baseLng]}
        zoom={14}
        className="w-full h-full"
        // MapContainerProps: these are all valid for react-leaflet v4+
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
          // attribution prop is optional now, empty string disables it cleanly
          // (removes TypeScript error for unknown prop)
        />
        {/* User (your location), show single blue dot (center) */}
        <Marker
          position={[baseLat, baseLng]}
          icon={createUserIcon()}
        />
        {/* Cars as available drivers */}
        {cars.map((car) => (
          <Marker
            key={car.id}
            position={[car.lat, car.lng]}
            icon={createCarIcon(car.dir)}
          />
        ))}
      </MapContainer>
      {/* Legend overlay, floating in top left */}
      <div className="absolute top-5 left-5 bg-white rounded-lg shadow p-3 z-[1000] min-w-[180px] pointer-events-none">
        <div className="font-semibold text-[20px] text-[#222] mb-3">Map Legend</div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-4 h-4 rounded-full" style={{ background: HYKR_BLUE }}></span>
          <span className="text-[15px] text-[#222]">Your Location</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          {/* Render car SVG same as on map, much smaller */}
          <span style={{ width: 24, height: 24, display: "flex", alignItems: "center" }}>
            <svg width="22" height="22" stroke={HYKR_BLUE} fill={HYKR_BLUE_LIGHT} strokeWidth="2" viewBox="0 0 24 24">
              <rect x="5" y="10" width="14" height="7" rx="2" fill={HYKR_BLUE_LIGHT} stroke={HYKR_BLUE}/>
              <rect x="9.5" y="8" width="5" height="5" rx="1.2" fill="white" stroke={HYKR_BLUE}/>
              <ellipse cx="7" cy="18" rx="2" ry="2" fill="#818cf8"/>
              <ellipse cx="17" cy="18" rx="2" ry="2" fill="#818cf8"/>
              <rect x="9.5" y="7.2" width="5" height="2.2" rx="1" fill={HYKR_BLUE}/>
            </svg>
          </span>
          <span className="text-[15px] text-[#222]">Available Drivers</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-[#b5b5b5]"></span>
          <span className="text-[15px] text-[#222]">Busy Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroMap;
