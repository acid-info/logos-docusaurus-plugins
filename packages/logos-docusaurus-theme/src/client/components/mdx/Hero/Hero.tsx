import clsx from 'clsx'
import React from 'react'
import { HeroContext } from './Hero.context'
import './Hero.scss'

export type HeroProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  size?: 'large' | 'medium' | 'small'
}

/**
 * A hero component that displays a large banner at the top of a page.
 *
 * @example
 * ```tsx
 * import {
 *   Hero,
 *   HeroTitle,
 *   HeroDescription,
 *   HeroVideo,
 *   HeroActions,
 *   HeroAction,
 * } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 *  <Hero size="large">
 *   <HeroInfo>
 *     <HeroTitle>
 *       {'Light and Performant Clients, for All Ethereum Validators'}
 *     </HeroTitle>
 *     <HeroDescription>
 *       {'Ethereum validators of all sizes trust Nimbus to run their nodes. From large node operators, to solo stakers on a Raspberry Pi.'}
 *     </HeroDescription>
 *     <HeroActions>
 *       <HeroAction variant="outlined" href="https://nimbus.guide/quick-start.html" target="_blank">
 *         Get Nimbus
 *       </HeroAction>
 *     </HeroActions>
 *   </HeroInfo>
 *
 *   <HeroVideo
 *     placeholderSrc="/hero/halo01-1080x1080-placeholder.png"
 *     desktop={{ scale: "1.514792899" }}
 *     mobile={{ scale: "1.514792899"  }}
 *   >
 *     <source src="/hero/halo01-2048x2048-24fps-1M.mov" type='video/mp4; codecs="hvc1"' />
 *     <source src="/hero/halo01-2048x2048-24fps-1M.webm" type="video/webm" />
 *   </HeroVideo>
 * </Hero>
 * ```
 */
export const Hero: React.FC<HeroProps> = ({
  size = 'medium',
  className,
  children,
  ...props
}) => {
  return (
    <HeroContext.Provider value={{ size }}>
      <div
        className={clsx(className, 'mdx-hero', `mdx-hero--${size}`)}
        {...props}
      >
        {children}
      </div>
    </HeroContext.Provider>
  )
}
