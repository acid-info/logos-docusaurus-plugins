import { translate } from '@docusaurus/Translate'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { IconButton } from '@site/src/components/IconButton'
import type { Props } from '@theme/ColorModeToggle'
import IconDarkMode from '@theme/Icon/DarkMode'
import IconLightMode from '@theme/Icon/LightMode'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

function ColorModeToggle({ className, value, onChange }: Props): JSX.Element {
  const isBrowser = useIsBrowser()

  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    },
  )

  return (
    <div className={clsx(styles.toggle, className)}>
      <IconButton
        title={title}
        aria-label={title}
        disabled={!isBrowser}
        className={clsx(!isBrowser && styles.toggleButtonDisabled)}
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
      >
        <IconLightMode
          className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
        />
        <IconDarkMode
          className={clsx(styles.toggleIcon, styles.darkToggleIcon)}
        />
      </IconButton>
    </div>
  )
}

export default React.memo(ColorModeToggle)
