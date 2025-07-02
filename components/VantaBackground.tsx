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
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let isMounted = true
    let initTimeout: NodeJS.Timeout

    const loadVanta = async () => {
      try {
        if (typeof window === "undefined" || !isMounted) {
          return
        }

        // Wait for DOM to be fully ready
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Load Three.js first
        const THREE = await import("three")
        ;(window as any).THREE = THREE

        // Load Vanta
        const VantaModule = await import("vanta/dist/vanta.dots.min")
        const VANTA_DOTS = VantaModule.default

        if (!VANTA_DOTS || typeof VANTA_DOTS !== "function") {
          throw new Error("VANTA_DOTS is not a function")
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
              size: 1.0,
              spacing: 50.0,
              showLines: true,
            })

            // Configure canvas after creation with a delay to prevent flickering
            initTimeout = setTimeout(() => {
              if (isMounted && vantaRef.current) {
                const canvas = vantaRef.current.querySelector("canvas")
                if (canvas) {
                  // Apply styles in one batch to prevent reflows
                  Object.assign(canvas.style, {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    zIndex: "0",
                    pointerEvents: "none",
                    display: "block",
                    visibility: "visible",
                    opacity: "1",
                    willChange: "auto", // Prevent unnecessary GPU layers
                    backfaceVisibility: "hidden", // Optimize rendering
                    transform: "translateZ(0)", // Force GPU acceleration but stable
                  })
                }
                setVantaLoaded(true)
                setIsInitialized(true)
              }
            }, 1000)
          } catch (initError) {
            console.error("Vanta initialization error:", initError)
          }
        }
      } catch (error) {
        console.error("Failed to load Vanta.js or Three.js:", error)
      }
    }

    loadVanta()

    return () => {
      isMounted = false
      if (initTimeout) clearTimeout(initTimeout)
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

  // Optimized resize handler with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)

      resizeTimeout = setTimeout(() => {
        if (vantaEffect.current && isInitialized) {
          try {
            vantaEffect.current.resize()

            // Re-apply canvas styles after resize
            if (vantaRef.current) {
              const canvas = vantaRef.current.querySelector("canvas")
              if (canvas) {
                Object.assign(canvas.style, {
                  width: "100vw",
                  height: "100vh",
                  zIndex: "0",
                  pointerEvents: "none",
                })
              }
            }
          } catch (error) {
            console.warn("Error resizing Vanta effect:", error)
          }
        }
      }, 150) // Debounce resize events
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [isInitialized])

  return (
    <>
      {/* Vanta container */}
      <div
        id="vanta-bg"
        ref={vantaRef}
        className="fixed inset-0"
        style={{
          zIndex: 0,
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          position: "fixed",
          background: "transparent",
          pointerEvents: "none",
          willChange: "auto", // Prevent unnecessary repaints
          contain: "layout style paint", // Optimize rendering containment
        }}
      />

      {/* Enhanced fallback background - only show if Vanta hasn't loaded */}
      {!vantaLoaded && (
        <div
          className="fixed inset-0 fallback-bg"
          style={{
            zIndex: -1,
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            position: "fixed",
            background: `
              linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%),
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
            willChange: "auto",
          }}
        />
      )}
    </>
  )
}
