"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

interface VideoCroppedProps {
  src: string;
  poster?: string;
  title: string;
  caption?: string;
  className?: string;
}

export function VideoCropped({
  src,
  poster,
  title,
  caption,
  className = "",
}: VideoCroppedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Autoplay when scrolled into view, pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Autoplay blocked by browser policy until interaction
                setIsPlaying(false);
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className={`relative flex flex-col ${className}`} ref={containerRef}>
      {/* 9:16 aspect container with full uncropped video visibility */}
      <div
        onClick={togglePlay}
        className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-card cursor-pointer group select-none border border-white/10"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          className="w-full h-full object-contain bg-black"
        />

        {/* Video overlay controls: Sound Toggle Button at top-right */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-[#0B2A63] backdrop-blur-md transition-colors border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A800]"
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Play indicator center when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none transition-opacity">
            <div className="w-14 h-14 rounded-full bg-[#0B2A63]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current translate-x-0.5 text-white" />
            </div>
          </div>
        )}
      </div>

      {caption && (
        <p className="mt-2.5 text-center text-xs text-white/80 font-sans leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
}
