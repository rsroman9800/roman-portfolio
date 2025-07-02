declare module "vanta/dist/vanta.dots.min" {
  interface VantaDotsOptions {
    el: HTMLElement | null
    THREE?: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    color2?: number
    backgroundColor?: number
    size?: number
    spacing?: number
    showLines?: boolean
  }

  interface VantaEffect {
    destroy(): void
    resize(): void
    setOptions(options: Partial<VantaDotsOptions>): void
  }

  function DOTS(options: VantaDotsOptions): VantaEffect

  export default DOTS
}

declare module "three" {
  export * from "three/src/Three"
}

// Extend window to include THREE
declare global {
  interface Window {
    THREE?: any
  }
}
