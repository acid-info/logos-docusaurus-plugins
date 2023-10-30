import { Button, PickIcon, Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './AppCard.scss'

export type AppCardProps = React.HTMLProps<HTMLDivElement> & {
  /**
   * The source URL for the light logo image
   */
  logoSrc?: string
  /**
   * The source URL for the dark logo image
   */
  logoSrcDark?: string
  /**
   * The name of the app
   */
  name?: React.ReactNode
  /**
   * The description of the app
   */
  description?: React.ReactNode
  /**
   * The URL to link to when the card is clicked
   */
  link?: string
  /**
   * The label for the link to the app
   */
  linkLabel?: string
}

/**
 * A card component for displaying information about an app.
 *
 * @example
 * **Example usage:**
 * ```jsx
 * import { AppCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 * <AppCard
 *   name="Status"
 *   link="https://status.im"
 *   linkLabel="Visit Status"
 *   logoSrc="/img/status-mark-white.svg"
 *   description="Waku powers many of the Status super app's features, including its private messaging."
 * />
 * ```
 *
 * **Grid example:**
 * ```jsx
 * import { Grid, AppCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 * <Grid xs={{ cols: 1, wrap: true, gap: "0 1rem" }} lg={{ cols: 2 }}>
 *   <Grid.Item xs={1}>
 *     <AppCard
 *       name="Status"
 *       description="Waku powers many of the Status super app's features, including its private messaging."
 *       logoSrc="/img/status-mark-black.svg"
 *       logoSrcDark="/img/status-mark-white.svg"
 *       link="https://status.im"
 *     />
 *   </Grid.Item>
 *   <Grid.Item xs={1}>
 *     <AppCard
 *       name="Status"
 *       description="Waku powers many of the Status super app's features, including its private messaging."
 *       logoSrc="/img/status-mark-black.svg"
 *       logoSrcDark="/img/status-mark-white.svg"
 *       link="https://status.im"
 *     />
 *   </Grid.Item>
 * </Grid>
 * ```
 */
export const AppCard: React.FC<AppCardProps> = ({
  logoSrc,
  logoSrcDark,
  name,
  description,
  link,
  linkLabel,
  ...props
}) => {
  return (
    <div {...props} className={clsx(props.className, 'mdx-app-card')}>
      {(logoSrc || logoSrcDark) && (
        <ThemedImage
          sources={{
            dark: logoSrcDark ?? logoSrc ?? '',
            light: logoSrc ?? logoSrcDark ?? '',
          }}
          alt={typeof name === 'string' ? name : ''}
          className="mdx-app-card__logo"
        />
      )}
      <Typography component="span" variant="h5" className="mdx-app-card__name">
        {name}
      </Typography>
      <Typography variant="subtitle1" className="mdx-app-card__description">
        {description}
      </Typography>
      {link && (
        <a href={link} target="_blank" className="mdx-app-card__link">
          <Button size="large" variant="outlined">
            <Typography variant="label1" component="span">
              {linkLabel ?? <>Visit {name}</>}
            </Typography>
            <span>
              <PickIcon color="primary" />
            </span>
          </Button>
        </a>
      )}
    </div>
  )
}
