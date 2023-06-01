import { AsciiConfigs } from '../../../types/ui.types'
import { defaultAsciiConfigs } from './HeroModel.configs'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { AsciiEffect } from 'three-stdlib'
import { generateTextShadow } from '../../../lib/ui.utils'

function useAsciiEffect(config: AsciiConfigs = {}) {
  const {
    renderIndex = defaultAsciiConfigs.renderIndex,
    characters = defaultAsciiConfigs.characters,
    invert = defaultAsciiConfigs.invert,
    color = defaultAsciiConfigs.color,
    resolution = defaultAsciiConfigs.resolution,
    bgColor = defaultAsciiConfigs.bgColor,
    fgColor = defaultAsciiConfigs.fgColor,
    textShadowSize = defaultAsciiConfigs.textShadowSize,
    withTextShadow = false,
  } = config
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

    if (withTextShadow) {
      const style = document.createElement('style')
      style.innerHTML = `table *{text-shadow: ${generateTextShadow(
        textShadowSize,
      )};`
      effect.domElement.appendChild(style)
    }

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

export const AsciiRenderer = (configs: AsciiConfigs) => {
  useAsciiEffect(configs)
  return <></>
}
