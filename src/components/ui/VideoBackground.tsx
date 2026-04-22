"use client"
import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  src: string
  overlayClassName?: string
}

export default function VideoBackground({ src, overlayClassName }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari supports HLS natively
      video.src = src
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls({ startLevel: -1, autoStartLoad: true })
          hls.loadSource(src)
          hls.attachMedia(video)
          return () => hls.destroy()
        }
      })
    }
  }, [src])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={overlayClassName ?? "absolute inset-0 bg-background/70"} />
    </div>
  )
}
