import { PrismTheme } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

const theme: PrismTheme = {
  ...dracula,
  plain: {
    ...dracula.plain,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}

export default theme
