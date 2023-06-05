export const random = (min, max) => {
  return Math.random() * (max - min) + min
}

export const mapFloat = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export const calcScrollThreshold = () => {
  return window.innerHeight * 0.4
}

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
  )
}

export const generateTextShadow = (steps: number): string => {
  let shadows = ''
  for (let i = 0; i < steps; i++) {
    let colorValue = Math.floor((i / (steps - 1)) * 255) // Generate a value between 0 and 255
    let shadow = `${-i * 5}px ${
      -i * 5
    }px 0px rgb(${colorValue}, ${colorValue}, ${colorValue})`
    shadows += (i === 0 ? '' : ', ') + shadow
  }
  return shadows
}

export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 997
}

export const calcHeroInfoMb = (sy) => {
  return mapFloat(scrollY, 0, calcScrollThreshold(), 0, 100)
}
