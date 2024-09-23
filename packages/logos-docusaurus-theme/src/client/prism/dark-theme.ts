import { PrismTheme } from 'prism-react-renderer'
const { themes } = require('prism-react-renderer')
const dracula = themes.dracula

const theme: PrismTheme = {
  ...dracula,
  plain: {
    ...dracula.plain,
    backgroundColor: 'rgba(var(--lsd-surface-secondary), 0.08)',
  },
}

export default theme
