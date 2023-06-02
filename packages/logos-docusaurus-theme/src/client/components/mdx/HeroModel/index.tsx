import React from 'react'
import { calcScrollThreshold, mapFloat } from '../../../lib/ui.utils'
import { useScrollY } from '../../../lib/useScrollY'
import { HeroModel as Model, HeroModelProps } from './HeroModel'

const calcMaxOffsetY = () => {
  return window.innerHeight * 0.1
}

export const HeroModel: React.FC<HeroModelProps> = (props) => {
  if (typeof window === 'undefined') return null

  const scrollY = useScrollY()
  const offsetY = mapFloat(
    scrollY,
    0,
    calcScrollThreshold(),
    0,
    calcMaxOffsetY(),
  )

  return (
    <div
      style={{
        // transform: `translateY(${-1*offsetY}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Model {...props} />
    </div>
  )
  // return (
  //   <BrowserOnly>
  //     {() => {
  //       const { HeroModel: Model } = require('./HeroModel')
  //
  //       return <Model {...props}></Model>
  //     }}
  //   </BrowserOnly>
  // )
}

export type { HeroModelProps } from './HeroModel'
