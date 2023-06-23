import { PrismTheme } from 'prism-react-renderer'
import vsLight from 'prism-react-renderer/themes/vsLight'

const theme: PrismTheme = {
  ...vsLight,
  plain: {
    ...vsLight.plain,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}

export default theme
