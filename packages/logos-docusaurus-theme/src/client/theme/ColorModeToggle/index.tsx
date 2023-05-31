import { IconButton } from '@acid-info/lsd-react'
import { translate } from '@docusaurus/Translate'
import useIsBrowser from '@docusaurus/useIsBrowser'
import IconDarkMode from '@theme/Icon/DarkMode'
import IconLightMode from '@theme/Icon/LightMode'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'

function ColorModeToggle({ className, buttonClassName, value, onChange }) {
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
    <IconButton
      className={clsx(
        'clean-btn',
        styles.toggle,
        className,
        !isBrowser && styles.toggleButtonDisabled,
        buttonClassName,
      )}
      type="button"
      onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
      disabled={!isBrowser}
      title={title}
      aria-label={title}
      aria-live="polite"
    >
      <IconLightMode
        className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
      />
      <IconDarkMode
        className={clsx(styles.toggleIcon, styles.darkToggleIcon)}
      />
    </IconButton>
  )
}

export default React.memo(ColorModeToggle)
