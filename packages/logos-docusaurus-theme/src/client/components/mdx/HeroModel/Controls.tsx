import { ROTATE_SPEED } from './HeroModel.configs'
import { MovementProps } from '../../../types/ui.types'
import React, { useEffect, useRef } from 'react'
import { useScrollY } from '../../../lib/useScrollY'
import { useFrame, useThree } from '@react-three/fiber'
import { calcRotateSpeed } from './HeroModel.utils'
import { OrbitControls } from '@react-three/drei'

class Vector3 {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  subtract(v: Vector3) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
  }

  add(v: Vector3) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  multiplyScalar(s: number) {
    return new Vector3(this.x * s, this.y * s, this.z * s)
  }

  clone() {
    return new Vector3(this.x, this.y, this.z)
  }

  toArray() {
    return [this.x, this.y, this.z]
  }
}

const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b
let targetPos: [number, number, number] = [0, 0, 0]

function calculateCameraPosition(scrollY: number): [number, number, number] {
  const baseXZ = -1.6 // Base x and z component at scrollY = 0
  const baseY = 4.04 // Base y component at scrollY = 0
  const rateXZ = -0.01 // Rate of change for x and z components
  const rateY = 0.00185 // Rate of change for y component
  const deltaX = baseXZ + rateXZ * scrollY - baseXZ
  const deltaY = baseY + rateY * scrollY - baseY
  const deltaZ = baseXZ + rateXZ * scrollY - baseXZ
  return [deltaX, deltaY, deltaZ]
}
export const Controls = ({
  rotateSpeed = ROTATE_SPEED,
  enableZoom = true,
  enableRotateOnScroll = true,
  preset,
  children,
  ...props
}: MovementProps) => {
  const ref = useRef<any>()
  const scrollY = useScrollY()
  const { camera, size } = useThree()
  const controls = useRef<any>()

  useFrame((state, delta) => {
    const speed = enableRotateOnScroll
      ? calcRotateSpeed(scrollY, rotateSpeed)
      : rotateSpeed
    ref.current.rotation.y += delta * speed
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
    const [deltaX, deltaY, deltaZ] = calculateCameraPosition(scrollY)

    // Add the deltas to the initial positions
    const newPositionX = preset.cameraPos[0] + deltaX
    const newPositionY = preset.cameraPos[1] + deltaY
    const newPositionZ = preset.cameraPos[2] + deltaZ

    camera.position.set(newPositionX, newPositionY, newPositionZ)
    camera.updateProjectionMatrix()

    // const scale = mapFloat(scrollY, 0, calcScrollThreshold(), 1, 0.5);
    // const initialPosition = ref.current.position.clone();
    // ref.current.scale.set(scale, scale, scale);
    // ref.current.position.y += 0.0001 * scale;
  }, [scrollY, camera])

  return (
    <group ref={ref} {...props}>
      {children}
      <OrbitControls
        ref={controls}
        enableZoom={false}
        target={preset.controlsTarget}
      />
    </group>
  )
}
