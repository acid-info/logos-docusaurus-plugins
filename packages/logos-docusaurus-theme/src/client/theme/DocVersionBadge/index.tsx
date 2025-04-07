import React from 'react'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import { ThemeClassNames } from '@docusaurus/theme-common'
import styles from './style.module.scss'
import { Typography } from '@acid-info/lsd-react'
import { useDocsVersion } from '@docusaurus/plugin-content-docs/lib/client/docsVersion.js'

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
