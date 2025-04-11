import Translate from '@docusaurus/Translate'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { IconEdit } from '../../components/Icon'
import { Typography } from '@acid-info/lsd-react'

export default function EditThisPage({ editUrl }) {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={ThemeClassNames.common.editThisPage}
    >
      <IconEdit />
      <Typography variant="body2">
        <Translate
          id="theme.common.editThisPage"
          description="The link label to edit the current page"
        >
          Edit this page
        </Translate>
      </Typography>
    </a>
  )
}
