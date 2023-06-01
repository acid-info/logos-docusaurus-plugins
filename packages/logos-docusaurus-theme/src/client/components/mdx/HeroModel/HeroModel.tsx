import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import clsx from 'clsx'

import {
  defaultPresets,
  OBJECTS_PRESETS,
  RESIZE_SPEED_FACTOR,
  ROTATE_SPEED,
} from './HeroModel.configs'
import { AsciiConfigs, LookPresetItemValues } from '../../../types/ui.types'

import './HeroModel.scss'
import { AsciiRenderer } from './Ascii'
import { Controls } from './Controls'
import { calcScrollThreshold, mapFloat } from '../../../lib/ui.utils'
import { useScrollY } from '../../../lib/useScrollY'

export type HeroModelProps = React.HTMLAttributes<HTMLDivElement> & {
  modelUrlHi: string
  modelUrlLow: string
  modelId?: string
  preset?: LookPresetItemValues
  mode?: 'simple' | 'abstract'
  asciiConfig?: AsciiConfigs
  rotateSpeed?: number

  enableZoom?: boolean
  enableRotateOnScroll?: boolean
  withParallelEffect?: boolean
}

const useLookPreset = (
  mode: 'abstract' | 'simple',
  preset?: LookPresetItemValues,
  modelId?: string,
): LookPresetItemValues => {
  return useMemo(() => {
    if (preset) return preset
    if (!modelId) return defaultPresets[mode]
    const existingPreset = OBJECTS_PRESETS.find((p) => p.modelId === modelId)
    return existingPreset ? existingPreset[mode] : defaultPresets[mode]
  }, [preset, modelId])
}

const getInitialY = (mode: 'abstract' | 'simple'): number => {
  return mode === 'abstract' ? 0 : -200
}

export const HeroModel = (props: HeroModelProps) => {
  const {
    modelUrlHi,
    modelUrlLow,
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
    ...divProps
  } = props

  const preset = useLookPreset(mode, presetProp, modelId)
  // const index = 1;
  // const preset = OBJECTS_PRESETS[1]? OBJECTS_PRESETS[index][mode] : defaultPresets[mode];
  const scrollY = useScrollY()

  return (
    <div
      className={clsx(
        className,
        'mdx-hero-model',
        'mdx-hero-model--ascii',
        `mdx-hero-model--${mode}`,
      )}
      {...divProps}
    >
      <div
        className={`mdx-hero-model--inner`}
        style={{
          ...(withParallelEffect
            ? {
                transform: `translateY(${getInitialY(mode) + scrollY * 0.1}px)`,
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
              position: preset.cameraPos,
              rotation: preset.cameraRot,
            }}
          >
            <directionalLight position={[-10, 10, 0]} intensity={1.5} />
            <directionalLight position={[-10, 10, 5]} intensity={0.3} />
            <directionalLight position={[-10, 20, 0]} intensity={1.5} />
            <directionalLight position={[100, -10, 0]} intensity={0.25} />
            <Controls rotateSpeed={rotateSpeed} preset={preset}>
              <Suspense fallback={<Model url={modelUrlLow} />}>
                <Model url={modelUrlHi} />
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
            0.2,
            1,
          ),
        }}
      />
    </div>
  )
}

function Model({ url, ...props }) {
  // useGLTF suspends the component, it literally stops processing
  const { scene } = useGLTF(url) as any
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
