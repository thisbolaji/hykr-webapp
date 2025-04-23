
import React from "react";

const VIDEO_WIDTH = 1200;
const VIDEO_HEIGHT = 500;
const ASPECT_RATIO = VIDEO_WIDTH / VIDEO_HEIGHT;

const BookingExperienceVideo = () => (
  <section
    className="w-full relative flex items-center justify-center bg-black overflow-hidden"
    style={{
      minHeight: VIDEO_HEIGHT,
      height: VIDEO_HEIGHT,
      maxHeight: VIDEO_HEIGHT,
      width: "100%",
      maxWidth: VIDEO_WIDTH,
      marginLeft: "auto",
      marginRight: "auto",
      aspectRatio: `${VIDEO_WIDTH}/${VIDEO_HEIGHT}`,
    }}
  >
    {/* Overlay for visual focus */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
    {/* Responsive Landscape Vimeo Embed */}
    <div className="absolute inset-0 w-full h-full">
      <iframe
        src="https://player.vimeo.com/video/1077844678?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title="Hykr"
        className="w-full h-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allowFullScreen
      />
    </div>
  </section>
);

export default BookingExperienceVideo;
