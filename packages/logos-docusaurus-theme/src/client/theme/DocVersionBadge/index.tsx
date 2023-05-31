import React from 'react'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDocsVersion } from '@docusaurus/theme-common/internal'
import styles from './style.module.scss'
import { Typography } from '@acid-info/lsd-react'

export default function DocVersionBadge({ className }) {
  const versionMetadata = useDocsVersion()
  if (versionMetadata.badge) {
    return (
      <span
        className={clsx(
          className,
          ThemeClassNames.docs.docVersionBadge,
          'badge badge--secondary',
          styles.badge,
        )}
      >
        <Typography variant="body3">
          <Translate
            id="theme.docs.versionBadge.label"
            values={{ versionLabel: versionMetadata.label }}
          >
            {'Version: {versionLabel}'}
          </Translate>
        </Typography>
      </span>
    )
  }
  return null
}
