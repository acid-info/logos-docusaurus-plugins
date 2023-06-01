import { calcScrollThreshold, mapFloat } from '../../../lib/ui.utils'
import {
  INITIAL_ZOOM,
  MAX_ROTATE_SPEED,
  MIN_ROTATE_SPEED,
  MIN_ZOOM,
  RESIZE_SPEED_FACTOR,
} from './HeroModel.configs'

export const calcRotateSpeed = (scrollY = 0, speed) => {
  const sFactor = mapFloat(scrollY, 0, window.innerHeight, 1, 10)
  return Math.max(Math.min(speed * sFactor, MAX_ROTATE_SPEED), MIN_ROTATE_SPEED)
}

export const calcZoom = (scrollY = 0, initZ = INITIAL_ZOOM) => {
  return Math.max(
    mapFloat(
      scrollY,
      0,
      calcScrollThreshold() * RESIZE_SPEED_FACTOR,
      initZ,
      MIN_ZOOM,
    ),
    MIN_ZOOM,
  )
}
