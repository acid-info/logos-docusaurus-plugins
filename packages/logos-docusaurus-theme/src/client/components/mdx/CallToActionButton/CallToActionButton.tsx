import { Button, ButtonProps, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import './CallToActionButton.scss'

export type CallToActionButtonProps = Props & {
  /**
   * The URL to link to when the button is clicked
   */
  href?: string
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * The variant of the button
   */
  variant?: ButtonProps['variant']
}

/**
 * A call-to-action button that can be used in MDX pages.
 *
 * @example
 * ```jsx
 * import { CallToActionButton } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx';
 *
 * <CallToActionButton href="https://discord.gg/server" size="large" variant="filled">
 *  Join our community
 * </CallToActionButton>
 * ```
 */
export const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  className,
  variant = 'filled',
  size = 'large',
  children,
  ...props
}) => {
  return (
    <Link className={clsx('mdx-cta-button', className)} {...(props as any)}>
      <Typography
        component="span"
        variant={size === 'large' ? 'label1' : 'label2'}
      >
        <Button size={size} variant={variant}>
          {children}
        </Button>
      </Typography>
    </Link>
  )
}
