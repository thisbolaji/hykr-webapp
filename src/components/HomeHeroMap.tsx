
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const baseLat = 40.7128;
const baseLng = -74.006;
const NUM_CARS = 6;
const CAR_COLOR = "#007cff";

function randomWobble(num: number) {
  // returns number in range [-0.003, 0.003] for micro position changes
  return (Math.random()-0.5) * 0.006 * num;
}

const createCarIcon = () =>
  L.divIcon({
    html: `<div style="
      background: ${CAR_COLOR};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1.5px solid #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.14);
      "></div>`,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const HomeHeroMap: React.FC = () => {
  const [cars, setCars] = useState(
    Array.from({ length: NUM_CARS }, (_, i) => ({
      id: i,
      lat: baseLat + randomWobble(i + 1),
      lng: baseLng + randomWobble(i + 1),
      dir: Math.random() * 360,
    }))
  );

  // Animate: every 1.5s move cars in random directions
  useEffect(() => {
    const interval = setInterval(() => {
      setCars((prev) =>
        prev.map((car, i) => {
          // move the car a little
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
    <div className="w-full h-56 md:w-[360px] md:h-[260px] rounded-xl shadow-lg overflow-hidden border bg-white">
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
          // @ts-ignore
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cars.map((car) => (
          <Marker key={car.id} position={[car.lat, car.lng]} icon={createCarIcon() as any} />
        ))}
      </MapContainer>
    </div>
  );
};

export default HomeHeroMap;
