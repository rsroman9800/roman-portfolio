"use client"

import { useEffect, useRef, useState } from "react"

interface VantaEffect {
  destroy(): void
  resize(): void
  setOptions(options: any): void
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<VantaEffect | null>(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    let loadTimeout: NodeJS.Timeout

    const loadVanta = async () => {
      try {
        if (typeof window === "undefined" || !isMounted) {
          return
        }

        // Wait longer for page to fully stabilize
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (!isMounted) return

        // Load Three.js
        const THREE = await import("three")
        ;(window as any).THREE = THREE

        // Load Vanta
        const VantaModule = await import("vanta/dist/vanta.dots.min")
        const VANTA_DOTS = VantaModule.default

        if (!VANTA_DOTS || typeof VANTA_DOTS !== "function") {
          console.warn("VANTA_DOTS not available, using fallback")
          return
        }

        if (vantaRef.current && !vantaEffect.current && isMounted) {
          try {
            vantaEffect.current = VANTA_DOTS({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x3b82f6,
              color2: 0x8b5cf6,
              backgroundColor: 0x0a0a0f,
              size: 1.2,
              spacing: 60.0,
              showLines: true,
            })

            // Simple canvas configuration
            loadTimeout = setTimeout(() => {
              if (isMounted) {
                setVantaLoaded(true)
              }
            }, 500)
          } catch (initError) {
            console.warn("Vanta initialization failed:", initError)
          }
        }
      } catch (error) {
        console.warn("Failed to load Vanta.js:", error)
      }
    }

    loadVanta()

    return () => {
      isMounted = false
      if (loadTimeout) clearTimeout(loadTimeout)
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (error) {
          console.warn("Error destroying Vanta effect:", error)
        }
        vantaEffect.current = null
      }
    }
  }, [])

  // Simplified resize handler
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (vantaEffect.current) {
          try {
            vantaEffect.current.resize()
          } catch (error) {
            console.warn("Error resizing Vanta effect:", error)
          }
        }
      }, 250)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <>
      {/* Vanta container - simplified positioning */}
      <div
        id="vanta-bg"
        ref={vantaRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
          pointerEvents: "none",
        }}
      />

      {/* Simplified fallback background */}
      {!vantaLoaded && (
        <div
          className="fallback-bg"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -20,
            background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
          }}
        />
      )}
    </>
  )
}
