import { PrismTheme } from 'prism-react-renderer'
import vsLight from 'prism-react-renderer/themes/vsLight'

const theme: PrismTheme = {
  ...vsLight,
  plain: {
    ...vsLight.plain,
    backgroundColor: 'rgba(var(--lsd-surface-secondary), 0.08)',
  },
}

export default theme
