
import React from "react";

const BookingExperienceVideo = () => (
  <section className="w-full relative flex items-center justify-center bg-black overflow-hidden" style={{ minHeight: 500, height: "70vh" }}>
    {/* Overlay to create a bit of a visual effect and focus */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
    {/* Video */}
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=900&q=80"
      style={{ minHeight: 500, maxHeight: 800 }}
    >
      {/* Replace the src below with your custom ride booking/travel video when available */}
      <source src="https://videos.pexels.com/video-files/6466786/6466786-hd_1920_1080_24fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    {/* Optional text overlay */}
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
      {/* Add heading or branding here if you want, or leave empty for clean look */}
      {/* <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">Seamless Booking Experience</h2> */}
    </div>
  </section>
