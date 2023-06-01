import BrowserOnly from '@docusaurus/BrowserOnly'
import React from 'react'
import { HeroModelProps } from './HeroModel'

export const HeroModel: React.FC<HeroModelProps> = (props) => {
  return (
    <BrowserOnly>
      {() => {
        const { HeroModel: Model } = require('./HeroModel')

        return <Model {...props}></Model>
      }}
    </BrowserOnly>
  )
}

export type { HeroModelProps } from './HeroModel'
