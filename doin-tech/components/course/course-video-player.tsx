"use client";

import * as React from "react";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerSkipForward,
  IconPlayerSkipBack,
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
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const speedMenuRef = React.useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showControls, setShowControls] = React.useState(true);
  const [speedMenuOpen, setSpeedMenuOpen] = React.useState(false);
  const [isDraggingSeek, setIsDraggingSeek] = React.useState(false);

  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPlaying(true);
        } catch {}
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || isDraggingSeek) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const updateSeekFromEvent = (clientX: number) => {
    const bar = progressBarRef.current;
    const video = videoRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = ratio * video.duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingSeek(true);
    updateSeekFromEvent(e.clientX);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSeek) {
        updateSeekFromEvent(e.clientX);
      }
    };
    const handleMouseUp = () => {
      if (isDraggingSeek) {
        setIsDraggingSeek(false);
      }
    };
    if (isDraggingSeek) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSeek]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMute = !isMuted;
    videoRef.current.muted = newMute;
    setIsMuted(newMute);
    if (!newMute && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
    setIsMuted(newVol === 0);
  };

  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    const nextTime = Math.max(
      0,
      Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + seconds)
    );
    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target as Node)) {
        setSpeedMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
    }
    if (video.currentTime) {
      setCurrentTime(video.currentTime);
    }
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "00:00";
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
      className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-950 shadow-2xl group select-none border border-white/10"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        preload="metadata"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer relative z-0"
      />

      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 bg-black/25 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Play Video"
            className="size-16 sm:size-20 rounded-full bg-black/45 backdrop-blur-md border border-white/35 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-black/60 transition-all cursor-pointer"
          >
            <IconPlayerPlayFilled className="size-7 sm:size-8 ml-1" />
          </button>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={progressBarRef}
          onMouseDown={handleSeekMouseDown}
          className="w-full h-3 flex items-center cursor-pointer group/seek relative select-none mb-3"
        >
          <div className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden relative group-hover/seek:h-2 transition-all">
            <div
              className="h-full bg-[#D4FB20] rounded-full transition-all duration-75 relative"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div
            className="absolute size-3.5 bg-[#D4FB20] rounded-full shadow-md -translate-x-1/2 opacity-0 group-hover/seek:opacity-100 transition-opacity"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-white text-xs gap-3">
          <div className="flex items-center gap-2.5 sm:gap-4">
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
              onClick={() => skipTime(-10)}
              aria-label="Skip backward 10 seconds"
              className="text-white hover:text-[#D4FB20] transition-colors cursor-pointer hidden sm:block"
            >
              <IconPlayerSkipBack className="size-4.5" />
            </button>

            <button
              type="button"
              onClick={() => skipTime(10)}
              aria-label="Skip forward 10 seconds"
              className="text-white hover:text-[#D4FB20] transition-colors cursor-pointer hidden sm:block"
            >
              <IconPlayerSkipForward className="size-4.5" />
            </button>

            <div className="flex items-center gap-2 group/vol">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="text-white hover:text-[#D4FB20] transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <IconVolumeOff className="size-5" />
                ) : (
                  <IconVolume className="size-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="w-14 sm:w-18 h-1 accent-[#D4FB20] bg-white/25 rounded-lg cursor-pointer"
              />
            </div>

            <span className="font-mono text-[11px] text-slate-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative" ref={speedMenuRef}>
              <button
                type="button"
                onClick={() => setSpeedMenuOpen((prev) => !prev)}
                className="text-white hover:text-[#D4FB20] text-xs font-semibold px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                {playbackRate}x
              </button>
              {speedMenuOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-xl py-1 z-50 text-white min-w-18 shadow-xl">
                  {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        changePlaybackRate(rate);
                        setSpeedMenuOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 transition-colors ${
                        playbackRate === rate ? "text-[#D4FB20] font-bold" : "text-slate-300"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="bg-white/20 text-[#D4FB20] text-[10px] font-bold px-2 py-0.5 rounded font-mono hidden sm:inline-block">
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
