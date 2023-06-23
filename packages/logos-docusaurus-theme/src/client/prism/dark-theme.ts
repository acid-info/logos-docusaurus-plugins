import { PrismTheme } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

const theme: PrismTheme = {
  ...dracula,
  plain: {
    ...dracula.plain,
    backgroundColor: 'rgba(var(--lsd-surface-secondary), 0.08)',
  },
}

export default theme
