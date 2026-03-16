"use client";

import { useEffect, useRef, useState } from "react";

type ViewportVideoProps = {
  src: string;
  poster?: string;
  width: number;
  height: number;
  className?: string;
  preload?: "none" | "metadata" | "auto";
};

export function ViewportVideo({
  src,
  poster,
  width,
  height,
  className,
  preload = "metadata",
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(preload === "auto");

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNearViewport = entry.isIntersecting;
        const isVisible =
          entry.boundingClientRect.top < window.innerHeight && entry.boundingClientRect.bottom > 0;

        if (isNearViewport) {
          setShouldLoad(true);
        }

        if (!isVisible) {
          video.pause();
          return;
        }

        if (video.readyState >= 2) {
          void video.play().catch(() => {});
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: [0, 0.35],
      },
    );

    observer.observe(video);

    const handleCanPlay = () => {
      const rect = video.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        void video.play().catch(() => {});
      }
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", handleCanPlay);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload={shouldLoad ? preload : "none"}
    />
  );
}
