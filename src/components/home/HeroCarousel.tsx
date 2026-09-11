"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const AUTO_ROTATE_MS = 5000
const SWIPE_THRESHOLD_PX = 40

export function HeroCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, AUTO_ROTATE_MS)
    // Restarting the timer whenever `index` changes (including from a manual
    // swipe or arrow tap) means the next automatic advance is always a full
    // AUTO_ROTATE_MS away, instead of immediately overriding the user.
    return () => clearInterval(timer)
  }, [images.length, index])

  function goTo(direction: 1 | -1) {
    setIndex((i) => (i + direction + images.length) % images.length)
  }

  // React registers onTouchMove as a passive listener, which silently ignores
  // preventDefault() — so a browser's own gesture handling (vertical scroll,
  // or an edge back-swipe on mobile Safari/Chrome) can hijack the touch
  // sequence before a React onTouchEnd ever fires. Attaching the listener
  // manually with { passive: false } is the only way to reliably claim a
  // horizontal swipe. The direction is also decided on the very first
  // touchmove sample (not after some accumulated distance) — on a real
  // device the browser can commit to its own scroll within that first
  // sample, so preventDefault() has to be called immediately to have any
  // chance of winning.
  useEffect(() => {
    const el = containerRef.current
    if (!el || images.length <= 1) return

    let startX = 0
    let startY = 0
    let deltaX = 0
    let tracking = false
    let directionDecided = false
    let claimedHorizontal = false

    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      deltaX = 0
      tracking = true
      directionDecided = false
      claimedHorizontal = false
    }

    function onTouchMove(e: TouchEvent) {
      if (!tracking) return
      const touch = e.touches[0]
      deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY

      if (!directionDecided) {
        directionDecided = true
        claimedHorizontal = Math.abs(deltaX) >= Math.abs(deltaY)
      }

      if (claimedHorizontal && e.cancelable) {
        e.preventDefault()
      }
    }

    function onTouchEnd() {
      if (tracking && claimedHorizontal && Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
        goTo(deltaX < 0 ? -1 : 1)
      }
      tracking = false
      claimedHorizontal = false
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("touchend", onTouchEnd)
    el.addEventListener("touchcancel", onTouchEnd)

    return () => {
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
      el.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 touch-pan-y overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/65 via-brand-primary/40 to-brand-primary/75" />

      {images.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
