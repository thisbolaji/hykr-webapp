
import React from "react";

// NOTE: For <video> playback, the src needs to be a direct .mp4 file URL.
// Google Drive sharing links won't work in <video> tags. Host your video on a CDN or get a direct mp4 URL.

const BookingExperienceVideo = () => (
  <section
    className="w-full relative flex items-center justify-center bg-black overflow-hidden"
    style={{
      minHeight: 500,
      height: 500,
      maxHeight: 500,
      width: "100%",
      maxWidth: 1200,
      marginLeft: "auto",
      marginRight: "auto",
      aspectRatio: "1200/500",
    }}
  >
    {/* Overlay for visual focus */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
    {/* Responsive Landscape Video */}
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=1200&q=80"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 500,
        maxHeight: 500,
        maxWidth: 1200,
        objectFit: "cover",
      }}
    >
      {/* 
        TODO: Replace the src below with your landscape .mp4 video url.
        Example of a direct .mp4 file URL:
        <source src="https://YOUR-CDN.com/path/to/your-video.mp4" type="video/mp4" />
      */}
      <source src="https://player.vimeo.com/external/359331178.sd.mp4?s=994e77dd8b6e2bcf9e43e58011e943853db21f1e&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
);

export default BookingExperienceVideo;
