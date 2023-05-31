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
