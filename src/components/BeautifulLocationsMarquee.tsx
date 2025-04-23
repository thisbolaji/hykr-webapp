
import React from "react";

const locations = [
  {
    name: "Grand Canyon, AZ",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?fit=crop&w=900&q=80"
  },
  {
    name: "Yosemite, CA",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?fit=crop&w=900&q=80"
  },
  {
    name: "Statue of Liberty, NY",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?fit=crop&w=900&q=80"
  },
  {
    name: "Yellowstone, WY",
    image:
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?fit=crop&w=900&q=80"
  },
  {
    name: "Golden Gate Bridge, SF",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?fit=crop&w=900&q=80"
  },
  {
    name: "Antelope Canyon, AZ",
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?fit=crop&w=900&q=80"
  },
  {
    name: "Niagara Falls, NY",
    image:
      "https://images.unsplash.com/photo-1551038247-3d9af20df552?fit=crop&w=900&q=80"
  },
  {
    name: "Zion National Park, UT",
    image:
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?fit=crop&w=900&q=80"
  },
  {
    name: "Times Square, NY",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?fit=crop&w=900&q=80"
  },
  {
    name: "Mount Rainier, WA",
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?fit=crop&w=900&q=80"
  }
];

// Duplicating locations 3x to fill space to achieve a seamless loop
const marqueeLocations = [...locations, ...locations, ...locations];

const Marquee = () => (
  <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5fbff] to-white" style={{ height: 500 }}>
    <div
      className="flex"
      style={{
        width: "max-content",
        animation: "marquee-infinite 50s linear infinite"
      }}
    >
      {marqueeLocations.map((loc, idx) => (
        <div
          className="flex flex-col items-center min-w-[350px] mx-8"
          key={loc.name + idx}
          style={{ flex: "0 0 350px" }}
        >
          <img
            src={loc.image}
            alt={loc.name}
            className="w-[350px] h-[350px] object-cover rounded-3xl shadow-lg border"
            draggable={false}
            style={{
              maxWidth: 350,
              minWidth: 350,
              minHeight: 350,
              maxHeight: 350,
            }}
          />
          <span className="mt-4 font-bold text-foreground text-center text-2xl whitespace-nowrap drop-shadow">
            {loc.name}
          </span>
        </div>
      ))}
    </div>
    <style>
      {`
      /* Use translateX to create seamless infinite scroll from left->right */
      @keyframes marquee-infinite {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      `}
    </style>
  </div>
);

const BeautifulLocationsMarquee = () => (
  <section className="py-12 px-6 bg-[#f5fbff]">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-hykr-blue text-center mb-8">
        Beautiful Locations We Love
      </h2>
      <Marquee />
    </div>
  </section>
);

export default BeautifulLocationsMarquee;
