import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import clsx from 'clsx'
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three-stdlib'
import './HeroModel.scss'

function Model({ url, ...props }) {
  // useGLTF suspends the component, it literally stops processing
  const { camera } = useThree()
  const { scene } = useGLTF(url) as any

  const size = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    return box.getSize(new THREE.Vector3())
  }, [scene])

  useLayoutEffect(() => {
    if (!camera) return
    const c = camera as THREE.PerspectiveCamera
    const fov = c.fov * (Math.PI / 180)
    const distance = Math.abs(Math.max(size.x, size.y) / Math.sin(fov / 2))
    c.position.setZ(distance)
  }, [size, camera])

  return (
    <primitive
      object={scene}
      {...props}
      position={[0, (size.y / -10) * 3, 0]}
    />
  )
}

function Rotate(props) {
  const ref = useRef<any>()
  useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime * 0.1))

  return <group ref={ref} {...props} scale={1.4} />
}

function useAsciiEffect({
  renderIndex = 1,
  bgColor = 'black',
  fgColor = 'white',
  // characters = ' .:-+*=%@#',
  characters = ' l.o.g.o.s',
  invert = false,
  color = false,
  resolution = 0.2,
}) {
  // Reactive state
  const { size, gl, scene, camera, viewport } = useThree()

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

  // Styling
  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor
    effect.domElement.style.backgroundColor = bgColor
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
    camera.position.setX(2)
    camera.position.setY(2)

    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera)
  }, renderIndex)
}

const AsciiRenderer = ({
  fgColor,
  bgColor,
}: {
  fgColor: string
  bgColor: string
}) => {
  useAsciiEffect({ fgColor, bgColor })

  return <></>
}

export type HeroModelProps = React.HTMLAttributes<HTMLDivElement> & {
  modelUrl: string
  layout?: 'floating' | 'cropped'
  renderer?: '3d' | 'ascii'
}

export const HeroModel: React.FC<HeroModelProps> = ({
  layout = 'floating',
  renderer = '3d',
  modelUrl,
  className,
  children,
  ...props
}) => {
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
      <div>
        <Canvas
          dpr={[1, 2]}
          camera={{
            fov: 50,
          }}
        >
          <directionalLight position={[10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[100, -10, 0]} intensity={0.25} />
          <Suspense fallback={<></>}>
            <Rotate>
              <Model url={modelUrl} />
            </Rotate>
          </Suspense>
          <OrbitControls />
          {renderer === 'ascii' && (
            <AsciiRenderer
              fgColor="rgb(var(--lsd-text-primary))"
              bgColor="rgb(var(--lsd-surface-primary))"
            />
          )}
        </Canvas>
      </div>
      <div></div>
    </div>
  )
}
