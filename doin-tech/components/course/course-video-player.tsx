"use client";

import * as React from "react";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconVolume,
  IconVolumeOff,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";

interface CourseVideoPlayerProps {
  poster?: string;
  videoSrc?: string;
}

export function CourseVideoPlayer({
  poster = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80",
  videoSrc = "/videos/course-preview.mp4",
}: CourseVideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 shadow-xl group select-none"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/25 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <button
            type="button"
            aria-label="Play Video"
            className="size-16 sm:size-20 rounded-full bg-black/45 backdrop-blur-md border border-white/35 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-black/60 transition-all cursor-pointer"
          >
            <IconPlayerPlayFilled className="size-7 sm:size-8 ml-1" />
          </button>
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={handleSeek}
          className="w-full h-2 bg-white/25 rounded-full overflow-hidden cursor-pointer mb-3.5 group/seek relative"
        >
          <div
            className="h-full bg-[#D4FB20] rounded-full relative transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="text-white hover:text-[#D4FB20] transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <IconPlayerPauseFilled className="size-5" />
              ) : (
                <IconPlayerPlayFilled className="size-5" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-white hover:text-[#D4FB20] transition-colors cursor-pointer"
            >
              {isMuted ? (
                <IconVolumeOff className="size-5" />
              ) : (
                <IconVolume className="size-5" />
              )}
            </button>

            <span className="font-mono text-[11px] text-slate-300">
              {formatTime(currentTime)} / {formatTime(duration || 165)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-white/20 text-[#D4FB20] text-[10px] font-bold px-2 py-0.5 rounded font-mono">
              1080p
            </span>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Toggle Fullscreen"
              className="text-white hover:text-[#D4FB20] transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <IconMinimize className="size-4.5" />
              ) : (
                <IconMaximize className="size-4.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
