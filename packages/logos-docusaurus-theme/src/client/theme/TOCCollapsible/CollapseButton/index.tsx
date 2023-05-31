import React from 'react'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import styles from './styles.module.css'
import { ArrowDownIcon, ArrowUpIcon, Typography } from '@acid-info/lsd-react'
export default function TOCCollapsibleCollapseButton({ collapsed, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'clean-btn',
        styles.tocCollapsibleButton,
        !collapsed && styles.tocCollapsibleButtonExpanded,
        props.className,
      )}
    >
      <div />
      <Typography variant="body2">
        <Translate
          id="theme.TOCCollapsible.toggleButtonLabel"
          description="The label used by the button on the collapsible TOC component"
        >
          On this page
        </Translate>
      </Typography>
      {!collapsed ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </button>
  )
}
