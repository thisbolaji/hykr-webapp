
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Brand colors
const HYKR_BLUE = "#26B3FF"; // bright blue, matches rideshare color
const HYKR_DARK = "#1C222B"; // accent for wheels/windows
const HYKR_BLUE_LIGHT = "#cee6ff";

// Map base coordinates (NYC for demo)
const baseLat = 40.7128;
const baseLng = -74.006;
const NUM_CARS = 6;

// Helper: tiny random walk offset
function randomWobble(num: number) {
  return (Math.random() - 0.5) * 0.006 * num;
}

// More-realistic car SVG icon, facing up, rotated by dirDeg
function createCarIcon(dirDeg: number) {
  // SVG based on attached Lyft/Uber-style: blue body, black roof/wheels
  const svg = encodeURIComponent(`
    <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x="7" y="6" width="24" height="12" rx="4" fill="${HYKR_BLUE}" stroke="${HYKR_DARK}" stroke-width="1.5"/>
        <rect x="13" y="8" width="12" height="6" rx="2" fill="#D6EEF9" stroke="${HYKR_DARK}" stroke-width="1"/>
        <ellipse cx="11" cy="20" rx="4.2" ry="4.2" fill="#282828" stroke="white" stroke-width="1.2"/>
        <ellipse cx="27" cy="20" rx="4.2" ry="4.2" fill="#282828" stroke="white" stroke-width="1.2"/>
        <rect x="17.75" y="6.2" width="2.5" height="3.5" rx="1.2" fill="#111827" opacity="0.4"/>
      </g>
    </svg>
  `);
  return L.divIcon({
    html: `
      <div style="transform: rotate(${dirDeg}deg); display: flex; align-items: center; justify-content: center;">
        <img src="data:image/svg+xml,${svg}" width="38" height="26" style="display:block"/>
      </div>
    `,
    className: "",
    iconSize: [38, 26],
    iconAnchor: [19, 13], // center
  });
}

// User location: blue dot, much smaller and simple
const createUserIcon = () =>
  L.divIcon({
    html: `<div style="
      background: ${HYKR_BLUE};
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2.5px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.13);
      "></div>`,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

const HomeHeroMap: React.FC = () => {
  // Car array: always NUM_CARS, each has lat/lng/dir
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

  // Exact size: 720px by 512px
  return (
    <div className="w-[720px] h-[512px] rounded-2xl shadow-2xl overflow-hidden border bg-white relative">
      <MapContainer
        center={[baseLat, baseLng]}
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
        />
        {/* User location: blue dot at center */}
        <Marker
          key="user"
          position={[baseLat, baseLng]}
          icon={createUserIcon()}
        />
        {/* Cars */}
        {cars.map((car) => (
          <Marker
            key={`car-${car.id}`}
            position={[car.lat, car.lng]}
            icon={createCarIcon(car.dir)}
          />
        ))}
      </MapContainer>
      {/* Legend overlay, floating in top left */}
      <div className="absolute top-5 left-5 bg-white rounded-lg shadow p-4 z-[1000] min-w-[180px] pointer-events-none">
        <div className="font-semibold text-[22px] text-[#222] mb-3">Map Legend</div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-4 h-4 rounded-full" style={{ background: HYKR_BLUE }}></span>
          <span className="text-[15px] text-[#222]">Your Location</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span style={{ width: 32, height: 23, display: "flex", alignItems: "center" }}>
            <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect x="7" y="6" width="24" height="12" rx="4" fill={HYKR_BLUE} stroke={HYKR_DARK} strokeWidth="1.5"/>
                <rect x="13" y="8" width="12" height="6" rx="2" fill="#D6EEF9" stroke={HYKR_DARK} strokeWidth="1"/>
                <ellipse cx="11" cy="20" rx="4.2" ry="4.2" fill="#282828" stroke="white" strokeWidth="1.2"/>
                <ellipse cx="27" cy="20" rx="4.2" ry="4.2" fill="#282828" stroke="white" strokeWidth="1.2"/>
                <rect x="17.75" y="6.2" width="2.5" height="3.5" rx="1.2" fill="#111827" opacity="0.4"/>
              </g>
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
