
import React from "react";

const locations = [
  {
    name: "Grand Canyon, AZ",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?fit=crop&w=400&q=80"
  },
  {
    name: "Yosemite, CA",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?fit=crop&w=400&q=80"
  },
  {
    name: "Statue of Liberty, NY",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?fit=crop&w=400&q=80"
  },
  {
    name: "Yellowstone, WY",
    image:
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?fit=crop&w=400&q=80"
  },
  {
    name: "Golden Gate Bridge, SF",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?fit=crop&w=400&q=80"
  },
  {
    name: "Antelope Canyon, AZ",
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?fit=crop&w=400&q=80"
  },
  {
    name: "Niagara Falls, NY",
    image:
      "https://images.unsplash.com/photo-1551038247-3d9af20df552?fit=crop&w=400&q=80"
  },
  {
    name: "Zion National Park, UT",
    image:
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?fit=crop&w=400&q=80"
  },
  {
    name: "Times Square, NY",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?fit=crop&w=400&q=80"
  },
  {
    name: "Mount Rainier, WA",
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?fit=crop&w=400&q=80"
  }
];

const Marquee = () => (
  <div className="relative w-full overflow-x-hidden py-4 bg-gradient-to-b from-[#f5fbff] to-white">
    <div
      className="flex space-x-8 animate-marquee group"
      style={{
        width: "max-content",
        animation: "marquee 40s linear infinite"
      }}
    >
      {[...locations, ...locations].map((loc, idx) => (
        <div
          className="flex flex-col items-center min-w-[170px]"
          key={loc.name + idx}
        >
          <img
            src={loc.image}
            alt={loc.name}
            className="w-40 h-24 object-cover rounded-xl shadow-md border"
            draggable={false}
          />
          <span className="mt-2 font-semibold text-foreground text-center text-lg whitespace-nowrap drop-shadow">
            {loc.name}
          </span>
        </div>
      ))}
    </div>
    <style>
      {`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(50%); }
      }
      `}
    </style>
  </div>
);

const BeautifulLocationsMarquee = () => (
  <section className="py-12 px-6 bg-[#f5fbff]">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-hykr-blue text-center mb-6">
        Beautiful Locations We Love
      </h2>
      <Marquee />
    </div>
  </section>
);

export default BeautifulLocationsMarquee;
