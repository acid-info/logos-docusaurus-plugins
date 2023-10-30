import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import { IconExternalLink } from '../../Icon'
import './SocialCard.scss'

export type SocialCardProps = React.HTMLProps<HTMLAnchorElement> & {
  /**
   * The URL of the logo image for the social media or community platform (light theme).
   */
  logoSrc?: string
  /**
   * The URL of the logo image for the social media or community platform (dark theme).
   */
  logoSrcDark?: string
  /**
   * The description or content associated with the social media or community platform.
   */
  description?: React.ReactNode
}

/**
 * A component used for displaying social media or community platform cards with a logo and description.
 *
 * @example
 * ```tsx
 * import { SocialCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx';
 *
 * <SocialCard
 *   title="Telegram Community"
 *   logoSrc="/path/to/telegram-logo.png"
 *   description="Join our Telegram community to stay updated and chat with fellow members."
 *   href="https://t.me/your-telegram-community"
 * />
 * ```
 *
 * Grid example:
 * ```tsx
 * import { Box, Grid, SocialCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx';
 *
 * <Box top={56} bottom={56}>
 *  <Grid xs={{ cols: 1, gap: '1rem' }} md={{ cols: 2 }}>
 *    <Grid.Item xs={1}>
 *      <SocialCard
 *        href='https://twitter.com/twitter-handle'
 *        logoSrcDark="/icons/x.svg"
 *        description='Follow us on X'
 *      />
 *    </Grid.Item>
 *    <Grid.Item xs={1}>
 *      <SocialCard
 *        href='https://discord.gg/discord-server'
 *        logoSrcDark="/icons/discord-white.svg"
 *        description='Join the community on Discord'
 *      />
 *    </Grid.Item>
 *  </Grid>
 *</Box>
 * ```
 */
export const SocialCard: React.FC<SocialCardProps> = ({
  title,
  logoSrc,
  logoSrcDark,
  description,
  ...props
}) => {
  return (
    <a
      target="_blank"
      {...props}
      className={clsx(props.className, 'mdx-social-card')}
    >
      <div className="mdx-social-card__row">
        {(logoSrc || logoSrcDark) && (
          <ThemedImage
            sources={{
              dark: logoSrcDark ?? logoSrc ?? '',
              light: logoSrc ?? logoSrcDark ?? '',
            }}
            alt={title ?? 'social card logo'}
            className="mdx-social-card__logo"
          />
        )}
        <IconExternalLink className="mdx-social-card__external-link" />
      </div>
      <Typography
        variant="body1"
        component="span"
        className="mdx-social-card__description"
      >
        {description}
      </Typography>
    </a>
  )
}
