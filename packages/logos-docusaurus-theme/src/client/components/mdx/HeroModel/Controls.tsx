import { ROTATE_SPEED } from './HeroModel.configs'
import { MovementProps } from '../../../types/ui.types'
import React, { useEffect, useRef } from 'react'
import { useScrollY } from '../../../lib/useScrollY'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {
  calcScrollThreshold,
  isMobile,
  isTouchDevice,
  mapFloat,
} from '../../../lib/ui.utils'

const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b
let targetPos: [number, number, number] = [0, 0, 0]

// function calculateCameraPosition(scrollY: number): [number, number, number] {
//   const baseXZ = -1.6 // Base x and z component at scrollY = 0
//   const baseY = 4.04 // Base y component at scrollY = 0
//   const rateXZ = -0.01 // Rate of change for x and z components
//   const rateY = 0.00185 // Rate of change for y component
//   const deltaX = baseXZ + rateXZ * scrollY - baseXZ
//   const deltaY = baseY + rateY * scrollY - baseY
//   const deltaZ = baseXZ + rateXZ * scrollY - baseXZ
//   return [deltaX, deltaY, deltaZ]
// }

const MAX_SCROLL = 400

function calculateVector(
  scrollY: number,
  scrollYMax: number,
  preset: number[],
  target: number[],
): [number, number, number] {
  // Calculate the lerp factor based on the scroll position
  const t = Math.min(scrollY, scrollYMax) / scrollYMax

  const newVector = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    // Perform a lerp between the preset and target for each component
    // @ts-ignore
    newVector[i] = lerp(preset[i], target[i], t)
  }

  return newVector as [number, number, number]
}

export const Controls = ({
  rotateSpeed = ROTATE_SPEED,
  enableZoom = true,
  enableRotateOnScroll = true,
  preset,
  targetPreset,
  children,
  ...props
}: MovementProps) => {
  const ref = useRef<any>()
  const scrollY = useScrollY()
  const { camera, size } = useThree()
  const controls = useRef<any>()
  const [lockOrbit, setLockOrbit] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [posY, setPosY] = React.useState(0)

  useFrame((state, delta) => {
    ref.current.rotation.y -=
      delta * (isMobile() ? 0.6 * rotateSpeed : rotateSpeed)
  })

  useEffect(() => {
    const onClick = () => {
      console.log(
        JSON.stringify(
          {
            cameraPos: camera.position.toArray(),
            cameraRot: camera.rotation.toArray().slice(0, 3),
            controlsTarget: controls.current.target.toArray(),
          },
          null,
          2,
        ),
      )
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [camera])

  useEffect(() => {
    if (isTouchDevice()) {
      controls.current.minPolarAngle = Math.PI / 2
      controls.current.maxPolarAngle = Math.PI / 2
      setTimeout(() => {
        setLockOrbit(true)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (isMobile()) {
      setScale(mapFloat(scrollY, 0, calcScrollThreshold(), 1, 0.65))

      setPosY(mapFloat(scrollY, 0, calcScrollThreshold(), 0, 0.35))
    }
  }, [scrollY])

  useEffect(() => {
    if (!enableZoom) return
    if (!targetPreset) return
    // we only apply zoom effect if targetPreset is defined

    const newPos = calculateVector(
      scrollY,
      MAX_SCROLL,
      preset.cameraPos,
      targetPreset.cameraPos,
    )
    const newRot = calculateVector(
      scrollY,
      MAX_SCROLL,
      preset.cameraRot,
      targetPreset.cameraRot,
    )
    const newTarget = calculateVector(
      scrollY,
      MAX_SCROLL,
      preset.controlsTarget,
      targetPreset.controlsTarget,
    )

    camera.position.set(...newPos)
    camera.rotation.set(...newRot)
    controls.current.target.set(...newTarget)
    camera.updateProjectionMatrix()
  }, [scrollY, camera])

  return (
    <group ref={ref} {...props} scale={scale} position-y={posY}>
      {children}
      <OrbitControls
        ref={controls}
        enableZoom={false}
        target={
          controls.current ? controls.current.target : preset.controlsTarget
        }
        enabled={!lockOrbit}
      />
    </group>
  )
}
