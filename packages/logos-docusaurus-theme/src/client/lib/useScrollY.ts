import { useWindowEventListener } from './useWindowEventListener'
import { useState } from 'react'

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0)
  useWindowEventListener('scroll', () => {
    setScrollY(window.scrollY)
  })
  return scrollY
}
