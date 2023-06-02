import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import clsx from 'clsx'
import React, { Suspense, useEffect, useMemo, useRef } from 'react'

import {
  AsciiConfigs,
  LookPresetItem,
  LookPresetItemValues,
} from '../../../types/ui.types'
import {
  defaultPresets,
  OBJECTS_PRESETS,
  RESIZE_SPEED_FACTOR,
  ROTATE_SPEED,
} from './HeroModel.configs'

import { calcScrollThreshold, mapFloat } from '../../../lib/ui.utils'
import { AsciiRenderer } from './Ascii'
import { Controls } from './Controls'
import './HeroModel.scss'
import { useScrollY } from '../../../lib/useScrollY'

export type HeroModelProps = React.HTMLAttributes<HTMLDivElement> & {
  modelId?: string
  preset?: LookPresetItemValues
  mode?: 'simple' | 'abstract'
  asciiConfig?: AsciiConfigs
  rotateSpeed?: number
  startY?: 'top' | 'bottom'

  enableZoom?: boolean
  enableRotateOnScroll?: boolean
  withParallelEffect?: boolean
}

const useLookPreset = (
  mode: 'abstract' | 'simple',
  preset?: LookPresetItemValues,
  modelId?: string,
): LookPresetItem => {
  return useMemo(() => {
    if (preset) return { ...defaultPresets, [mode]: preset }
    if (!modelId) return defaultPresets
    const existingPreset = OBJECTS_PRESETS.find((p) => p.modelId === modelId)
    return existingPreset ? existingPreset : defaultPresets
  }, [preset, modelId])
}

const getInitialY = (mode: 'abstract' | 'simple'): number => {
  return mode === 'abstract' ? 0 : window.innerWidth > 997 ? 0 : 0
}

export const HeroModel = (props: HeroModelProps) => {
  const {
    modelId,
    preset: presetProp,
    mode = 'simple',
    className,
    children,
    asciiConfig,
    rotateSpeed = ROTATE_SPEED,
    enableZoom,
    enableRotateOnScroll,
    withParallelEffect = true,
    startY = 'bottom',
    ...divProps
  } = props

  const preset = useLookPreset(mode, presetProp, modelId)
  // const index = 4;
  // const preset = OBJECTS_PRESETS[index] ? OBJECTS_PRESETS[index] : defaultPresets;
  const scrollY = useScrollY()

  return (
    <div
      className={clsx(
        className,
        'mdx-hero-model',
        'mdx-hero-model--ascii',
        `mdx-hero-model--${mode}`,
        `mdx-hero-model--${startY}`,
      )}
      {...divProps}
    >
      <div
        className={`mdx-hero-model--inner`}
        style={{
          ...(withParallelEffect
            ? {
                transform: `translateY(${
                  0
                  // getInitialY(mode) + scrollY * 0.1
                }px) scale(var(--mdx-hero-model-wrapper-scale))`,
              }
            : {}),
        }}
      >
        <Suspense fallback={<span> </span>}>
          <Canvas
            dpr={[1, 2]}
            style={{
              height: '100vh',
            }}
            camera={{
              fov: 50,
              position: preset[mode].cameraPos,
              rotation: preset[mode].cameraRot,
            }}
          >
            <directionalLight position={[-10, 10, 0]} intensity={1.5} />
            <directionalLight position={[-10, 10, 5]} intensity={0.3} />
            <directionalLight position={[-10, 20, 0]} intensity={1.5} />
            <directionalLight position={[100, -10, 0]} intensity={0.25} />
            <Controls
              rotateSpeed={rotateSpeed}
              preset={preset[mode]}
              targetPreset={preset.targetLook}
              enableZoom={mode !== 'simple'}
            >
              <Suspense
                fallback={<Model url={`/hero/${preset.modelId}/lo.glb`} />}
              >
                <Model url={`/hero/${preset.modelId}/hi.glb`} />
                <AsciiRenderer {...asciiConfig} />
              </Suspense>
            </Controls>
          </Canvas>
        </Suspense>
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

function Model({ url, onMount = () => {}, ...props }) {
  // useGLTF suspends the component, it literally stops processing
  const { scene } = useGLTF(url, '/scripts/draco-1.4.3/') as any
  useEffect(() => {
    onMount()
  }, [])
  // By the time we're here the model is gueranteed to be available
  return <primitive object={scene} {...props} />
}

function Rotate(props) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      // @ts-ignore
      return (ref.current.rotation.y = state.clock.elapsedTime)
    }
    return ref
  })
  return <group ref={ref} {...props} />
}
