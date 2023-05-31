import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import clsx from 'clsx'
import React, {
  PropsWithChildren,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three-stdlib'
import './HeroModel.scss'
import {
  calcScrollThreshold,
  isTouchDevice,
  mapFloat,
  random,
} from '../../../lib/ui.utils'
import { useScrollY } from '../../../lib/useScrollY'

let ROTATE_SPEED = 0.1
const MIN_ROTATE_SPEED = 0.1
const MAX_ROTATE_SPEED = 1

const MAX_Z = 20 * 1.4 // or another value that suits your needs
const MIN_Z = 0.2 * 1.4
const MIN_Y = -0.25
const MAX_Y = 0.25
const MIN_X = -0.25
const MAX_X = 0.25

const MIN_ZOOM = 0.22
const RESIZE_SPEED_FACTOR = 0.9
const INITIAL_ZOOM = 3
const calcZoom = (scrollY = 0, initZ = INITIAL_ZOOM) => {
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

const calcRotateSpeed = (scrollY = 0, speed) => {
  const sFactor = mapFloat(scrollY, 0, window.innerHeight, 1, 10)
  return Math.max(Math.min(speed * sFactor, MAX_ROTATE_SPEED), MIN_ROTATE_SPEED)
}

function Model({ url, ...props }) {
  // useGLTF suspends the component, it literally stops processing
  const { scene } = useGLTF(url) as any
  // useLayoutEffect(() => {
  //   if (!camera) return
  //   const c = camera as THREE.PerspectiveCamera
  //   const fov = c.fov * (Math.PI / 180)
  //   const distance = Math.abs(Math.max(size.x, size.y) / Math.sin(fov / 2))
  //   c.position.setZ(distance)
  // }, [size, camera])
  return (
    <primitive
      object={scene}
      {...props}
      // position={[0, (10 / -10) * 3, 0]}
    />
  )
}

type RotateProps = PropsWithChildren<{
  initialZ?: number
  rotateSpeed?: number
  enableZoom?: boolean
  enableRotateOnScroll?: boolean
}>

function Movements({
  initialZ,
  rotateSpeed = ROTATE_SPEED,
  enableZoom = true,
  enableRotateOnScroll = true,
  ...props
}: RotateProps) {
  const ref = useRef<any>()
  const scrollY = useScrollY()

  useFrame((state, delta) => {
    // const f = mapFloat(scrollY, 0, 1000, 1, 2);
    // ref.current.rotation.x  += delta * (ROTATE_SPEED);
    // ref.current.rotation.y += delta * (ROTATE_SPEED);
    const speed = enableRotateOnScroll
      ? calcRotateSpeed(scrollY, rotateSpeed)
      : rotateSpeed
    ref.current.rotation.y += delta * speed
  })

  return (
    <group
      ref={ref}
      {...props}
      scale={enableZoom ? calcZoom(scrollY, initialZ) : initialZ}
    />
  )
}

type AsciiConfigs = {
  characters?: string
  invert?: boolean
  color?: boolean
  bgColor?: string
  fgColor?: string
  resolution?: number
  renderIndex?: number
}

const defaultAsciiConfigs = {
  renderIndex: 1,
  bgColor: 'rgb(var(--lsd-surface-primary))',
  fgColor: 'rgb(var(--lsd-text-primary))',
  characters: ' l.o.g.o.s',
  invert: false,
  color: false,
  resolution: 0.2,
}

type AsciiEffectProps = {
  config?: AsciiConfigs
  initialZ?: number
}

function useAsciiEffect({ config = {}, initialZ }: AsciiEffectProps) {
  const {
    renderIndex = defaultAsciiConfigs.renderIndex,
    characters = defaultAsciiConfigs.characters,
    invert = defaultAsciiConfigs.invert,
    color = defaultAsciiConfigs.color,
    resolution = defaultAsciiConfigs.resolution,
    bgColor = defaultAsciiConfigs.bgColor,
    fgColor = defaultAsciiConfigs.fgColor,
  } = config

  // Reactive state
  const { gl, size, scene, camera, viewport } = useThree()

  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    })
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, invert, color, resolution])

  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor
    // effect.domElement.style.backgroundColor = bgColor
  }, [fgColor, bgColor])

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.style.opacity = '0'
    gl.domElement.parentNode!.appendChild(effect.domElement)
    return () => {
      gl.domElement.style.opacity = '1'
      gl.domElement.parentNode!.removeChild(effect.domElement)
    }
  }, [effect])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera)
  }, renderIndex)
}

const AsciiRenderer = (props: AsciiEffectProps) => {
  useAsciiEffect(props)
  return <></>
}

export type HeroModelProps = React.HTMLAttributes<HTMLDivElement> & {
  modelUrl: string
  layout?: 'floating' | 'cropped'
  renderer?: '3d' | 'ascii'
  asciiConfig?: AsciiConfigs
  initialZ?: number
  initialX?: number
  initialY?: number
  rotateSpeed?: number
  enableZoom?: boolean
  enableRotateOnScroll?: boolean
  withParallelEffect?: boolean
}

export const HeroModel: React.FC<HeroModelProps> = ({
  layout = 'floating',
  renderer = '3d',
  modelUrl,
  className,
  children,
  asciiConfig,
  initialX,
  initialY,
  initialZ,
  rotateSpeed = ROTATE_SPEED,
  enableZoom,
  enableRotateOnScroll,
  withParallelEffect,
  ...props
}) => {
  const scrollY = useScrollY()

  const initialPosition = useMemo(() => {
    if (typeof window === 'undefined') return new THREE.Vector3(0, 0, 0)
    if (renderer === 'ascii') {
      return new THREE.Vector3(
        initialX || random(MIN_X, MAX_X),
        initialY || random(MIN_Y, MAX_Y),
        0,
      )
    }
    // if not ascii then use the max z
    return new THREE.Vector3(3.1, initialY || random(MIN_Y, MAX_Y), 0)
  }, [initialX, initialY, initialZ, renderer])
  return (
    <div
      className={clsx(
        className,
        'mdx-hero-model',
        `mdx-hero-model--${layout}`,
        `mdx-hero-model--${renderer}`,
      )}
      {...props}
    >
      <div
        className={`mdx-hero-model--inner`}
        style={{
          // a nice parallax effect based on scroll position
          ...(withParallelEffect
            ? { transform: `translateY(${scrollY * 0.1}px)` }
            : {}),
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{
            fov: 50,
            position: initialPosition,
          }}
        >
          <directionalLight position={[-10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={0.3} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[100, -10, 0]} intensity={0.25} />
          <Suspense fallback={<></>}>
            <Movements
              initialZ={initialZ}
              enableZoom={enableZoom}
              enableRotateOnScroll={enableRotateOnScroll}
            >
              <Model url={modelUrl} />
            </Movements>
          </Suspense>
          {!isTouchDevice() && <OrbitControls enableZoom={false} />}
          {renderer === 'ascii' && (
            <AsciiRenderer config={asciiConfig} initialZ={initialZ} />
          )}
        </Canvas>
      </div>
      <div
        className={'mdx-hero-model--shade'}
        style={{
          opacity: mapFloat(
            scrollY,
            0,
            calcScrollThreshold() * RESIZE_SPEED_FACTOR,
            0,
            1,
          ),
        }}
      />
    </div>
  )
}
