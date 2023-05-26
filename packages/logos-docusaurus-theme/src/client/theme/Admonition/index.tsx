import { Typography } from '@acid-info/lsd-react'
import { ThemeClassNames } from '@docusaurus/theme-common'
import Translate from '@docusaurus/Translate'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

function NoteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00004 11.3333C8.18893 11.3333 8.34737 11.2693 8.47537 11.1413C8.60337 11.0133 8.66715 10.8551 8.66671 10.6667C8.66671 10.4778 8.60271 10.3193 8.47471 10.1913C8.34671 10.0633 8.18849 9.99957 8.00004 10C7.81115 10 7.65271 10.064 7.52471 10.192C7.39671 10.32 7.33293 10.4782 7.33337 10.6667C7.33337 10.8556 7.39737 11.014 7.52537 11.142C7.65337 11.27 7.8116 11.3338 8.00004 11.3333ZM7.33337 8.66668H8.66671V4.66668H7.33337V8.66668ZM8.00004 14.6667C7.07782 14.6667 6.21115 14.4916 5.40004 14.1413C4.58893 13.7911 3.88337 13.3162 3.28337 12.7167C2.68337 12.1167 2.20849 11.4111 1.85871 10.6C1.50893 9.7889 1.33382 8.92223 1.33337 8.00001C1.33337 7.07779 1.50849 6.21112 1.85871 5.40001C2.20893 4.5889 2.68382 3.88334 3.28337 3.28334C3.88337 2.68334 4.58893 2.20845 5.40004 1.85868C6.21115 1.5089 7.07782 1.33379 8.00004 1.33334C8.92226 1.33334 9.78893 1.50845 10.6 1.85868C11.4112 2.2089 12.1167 2.68379 12.7167 3.28334C13.3167 3.88334 13.7918 4.5889 14.142 5.40001C14.4923 6.21112 14.6672 7.07779 14.6667 8.00001C14.6667 8.92223 14.4916 9.7889 14.1414 10.6C13.7912 11.4111 13.3163 12.1167 12.7167 12.7167C12.1167 13.3167 11.4112 13.7918 10.6 14.142C9.78893 14.4922 8.92226 14.6671 8.00004 14.6667ZM8.00004 13.3333C9.48893 13.3333 10.75 12.8167 11.7834 11.7833C12.8167 10.75 13.3334 9.4889 13.3334 8.00001C13.3334 6.51112 12.8167 5.25001 11.7834 4.21668C10.75 3.18334 9.48893 2.66668 8.00004 2.66668C6.51115 2.66668 5.25004 3.18334 4.21671 4.21668C3.18337 5.25001 2.66671 6.51112 2.66671 8.00001C2.66671 9.4889 3.18337 10.75 4.21671 11.7833C5.25004 12.8167 6.51115 13.3333 8.00004 13.3333Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TipIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14.6666C7.63333 14.6666 7.31933 14.536 7.058 14.2746C6.79667 14.0133 6.66622 13.6995 6.66667 13.3333H9.33333C9.33333 13.7 9.20267 14.014 8.94133 14.2753C8.68 14.5366 8.36622 14.6671 8 14.6666ZM5.33333 12.6666V11.3333H10.6667V12.6666H5.33333ZM5.5 10.6666C4.73333 10.2111 4.12489 9.59998 3.67467 8.83331C3.22445 8.06665 2.99956 7.23331 3 6.33331C3 4.94442 3.48622 3.76376 4.45867 2.79131C5.43111 1.81887 6.61156 1.33287 8 1.33331C9.38889 1.33331 10.5696 1.81954 11.542 2.79198C12.5144 3.76442 13.0004 4.94487 13 6.33331C13 7.23331 12.7751 8.06665 12.3253 8.83331C11.8756 9.59998 11.2671 10.2111 10.5 10.6666H5.5ZM5.9 9.33331H10.1C10.6 8.97776 10.9862 8.53887 11.2587 8.01665C11.5311 7.49442 11.6671 6.93331 11.6667 6.33331C11.6667 5.31109 11.3111 4.44442 10.6 3.73331C9.88889 3.0222 9.02222 2.66665 8 2.66665C6.97778 2.66665 6.11111 3.0222 5.4 3.73331C4.68889 4.44442 4.33333 5.31109 4.33333 6.33331C4.33333 6.93331 4.46956 7.49442 4.742 8.01665C5.01444 8.53887 5.40045 8.97776 5.9 9.33331Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DangerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 14L2 10.5V5.5L5.5 2H10.5L14 5.5V10.5L10.5 14H5.5ZM6.1 10.8333L8 8.93333L9.9 10.8333L10.8333 9.9L8.93333 8L10.8333 6.1L9.9 5.16667L8 7.06667L6.1 5.16667L5.16667 6.1L7.06667 8L5.16667 9.9L6.1 10.8333ZM6.06667 12.6667H9.93333L12.6667 9.93333V6.06667L9.93333 3.33333H6.06667L3.33333 6.06667V9.93333L6.06667 12.6667Z"
        fill="currentColor"
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33334 11.3333H8.66668V7.33331H7.33334V11.3333ZM8.00001 5.99998C8.1889 5.99998 8.34734 5.93598 8.47534 5.80798C8.60334 5.67998 8.66712 5.52176 8.66668 5.33331C8.66668 5.14442 8.60268 4.98598 8.47468 4.85798C8.34668 4.72998 8.18845 4.6662 8.00001 4.66665C7.81112 4.66665 7.65268 4.73065 7.52468 4.85865C7.39668 4.98665 7.3329 5.14487 7.33334 5.33331C7.33334 5.5222 7.39734 5.68065 7.52534 5.80865C7.65334 5.93665 7.81157 6.00042 8.00001 5.99998ZM8.00001 14.6666C7.07779 14.6666 6.21112 14.4915 5.40001 14.1413C4.5889 13.7911 3.88334 13.3162 3.28334 12.7166C2.68334 12.1166 2.20845 11.4111 1.85868 10.6C1.5089 9.78887 1.33379 8.9222 1.33334 7.99998C1.33334 7.07776 1.50845 6.21109 1.85868 5.39998C2.2089 4.58887 2.68379 3.88331 3.28334 3.28331C3.88334 2.68331 4.5889 2.20842 5.40001 1.85865C6.21112 1.50887 7.07779 1.33376 8.00001 1.33331C8.92223 1.33331 9.7889 1.50842 10.6 1.85865C11.4111 2.20887 12.1167 2.68376 12.7167 3.28331C13.3167 3.88331 13.7918 4.58887 14.142 5.39998C14.4922 6.21109 14.6671 7.07776 14.6667 7.99998C14.6667 8.9222 14.4916 9.78887 14.1413 10.6C13.7911 11.4111 13.3162 12.1166 12.7167 12.7166C12.1167 13.3166 11.4111 13.7918 10.6 14.142C9.7889 14.4922 8.92223 14.6671 8.00001 14.6666ZM8.00001 13.3333C9.4889 13.3333 10.75 12.8166 11.7833 11.7833C12.8167 10.75 13.3333 9.48887 13.3333 7.99998C13.3333 6.51109 12.8167 5.24998 11.7833 4.21665C10.75 3.18331 9.4889 2.66665 8.00001 2.66665C6.51112 2.66665 5.25001 3.18331 4.21668 4.21665C3.18334 5.24998 2.66668 6.51109 2.66668 7.99998C2.66668 9.48887 3.18334 10.75 4.21668 11.7833C5.25001 12.8166 6.51112 13.3333 8.00001 13.3333Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CautionIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00001 14.6833C7.82224 14.6833 7.65268 14.65 7.49135 14.5833C7.33001 14.5167 7.1829 14.4222 7.05001 14.3L1.70001 8.94999C1.57779 8.81666 1.48335 8.66932 1.41668 8.50799C1.35001 8.34666 1.31668 8.17732 1.31668 7.99999C1.31668 7.82221 1.35001 7.64999 1.41668 7.48332C1.48335 7.31666 1.57779 7.17221 1.70001 7.04999L7.05001 1.69999C7.18335 1.56666 7.33068 1.46932 7.49201 1.40799C7.65335 1.34666 7.82268 1.31621 8.00001 1.31666C8.17779 1.31666 8.35001 1.34732 8.51668 1.40866C8.68335 1.46999 8.82779 1.5671 8.95001 1.69999L14.3 7.04999C14.4333 7.17221 14.5307 7.31666 14.592 7.48332C14.6533 7.64999 14.6838 7.82221 14.6833 7.99999C14.6833 8.17777 14.6529 8.34732 14.592 8.50866C14.5311 8.66999 14.4338 8.8171 14.3 8.94999L8.95001 14.3C8.82779 14.4222 8.68335 14.5167 8.51668 14.5833C8.35001 14.65 8.17779 14.6833 8.00001 14.6833ZM8.00001 13.35L13.35 7.99999L8.00001 2.64999L2.65001 7.99999L8.00001 13.35ZM7.33335 8.66666H8.66668V4.66666H7.33335V8.66666ZM8.00001 10.6667C8.1889 10.6667 8.34735 10.6027 8.47535 10.4747C8.60335 10.3467 8.66713 10.1884 8.66668 9.99999C8.66668 9.8111 8.60268 9.65266 8.47468 9.52466C8.34668 9.39666 8.18846 9.33288 8.00001 9.33332C7.81113 9.33332 7.65268 9.39732 7.52468 9.52532C7.39668 9.65332 7.3329 9.81154 7.33335 9.99999C7.33335 10.1889 7.39735 10.3473 7.52535 10.4753C7.65335 10.6033 7.81157 10.6671 8.00001 10.6667Z"
        fill="currentColor"
      />
    </svg>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  note: {
    infimaClassName: 'secondary',
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)"
      >
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: 'success',
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)"
      >
        tip
      </Translate>
    ),
  },
  danger: {
    infimaClassName: 'danger',
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)"
      >
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: 'info',
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)"
      >
        info
      </Translate>
    ),
  },
  caution: {
    infimaClassName: 'warning',
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        caution
      </Translate>
    ),
  },
}

// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: 'note',
  important: 'info',
  success: 'tip',
  warning: 'danger',
}

function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType
  const config = AdmonitionConfigs[type]
  if (config) {
    return config
  }
  console.warn(
    `No admonition config found for admonition type "${type}". Using Info as fallback.`,
  )
  return AdmonitionConfigs.info
}

// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children)
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) &&
      item.props?.mdxType === 'mdxAdmonitionTitle',
  )
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>
  return {
    mdxAdmonitionTitle,
    rest,
  }
}

function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(props.children)
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  }
}

export default function Admonition(props) {
  const {
    children,
    type,
    title,
    icon: iconProp,
  } = processAdmonitionProps(props)
  const typeConfig = getAdmonitionConfig(type)
  const titleLabel = title ?? typeConfig.label
  const { iconComponent: IconComponent } = typeConfig
  const icon = iconProp ?? <IconComponent />

  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        `alert--${typeConfig.infimaClassName}`,
        styles.admonition,
      )}
    >
      <span className={styles.admonitionIcon}>{icon}</span>
      <div>
        <Typography variant="body1" className={styles.admonitionHeading}>
          {titleLabel}
        </Typography>
        <Typography variant="body1" className={styles.admonitionContent}>
          {children}
        </Typography>
      </div>
    </div>
  )
}
