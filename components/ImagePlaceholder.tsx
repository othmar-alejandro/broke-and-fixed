"use client"

import Image from "next/image"
import { useState } from "react"

interface ImagePlaceholderProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  containerClassName?: string
  label?: string
  ratio?: "square" | "video" | "portrait" | "wide" | "ultrawide"
}

const ratioClassMap: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  ultrawide: "aspect-[21/9]",
}

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
  containerClassName,
  label,
  ratio = "wide",
}: ImagePlaceholderProps) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`relative ${ratioClassMap[ratio]} bg-gradient-to-br from-sage/15 to-espresso/10 ring-1 ring-espresso/10 overflow-hidden ${containerClassName || ""}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <svg
            className="w-10 h-10 text-espresso/30 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          {label && (
            <div className="text-[10px] uppercase tracking-[0.18em] text-espresso/40 font-semibold mb-1">
              {label}
            </div>
          )}
          <div className="text-xs text-espresso/50 font-medium leading-snug max-w-[28ch]">
            {alt}
          </div>
          <div className="text-[10px] text-espresso/30 mt-1.5 font-mono">
            {src}
          </div>
        </div>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setErrored(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}
