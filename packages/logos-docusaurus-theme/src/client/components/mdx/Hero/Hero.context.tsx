import React, { useContext } from 'react'

export type HeroContextType = {
  size?: 'small' | 'medium' | 'large'
}

export const HeroContext = React.createContext<HeroContextType>({
  size: 'medium',
})

export const useHero = () => useContext(HeroContext)
