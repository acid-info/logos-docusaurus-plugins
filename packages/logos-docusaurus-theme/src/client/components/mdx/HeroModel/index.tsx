import React from 'react'
import { HeroModel as Model, HeroModelProps } from './HeroModel'

export const HeroModel: React.FC<HeroModelProps> = (props) => {
  if (typeof window === 'undefined') return null

  return <Model {...props} />

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
