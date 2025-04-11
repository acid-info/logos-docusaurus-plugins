import { Typography } from '@acid-info/lsd-react'
import Link from '@docusaurus/Link'
import { IconArrowLeft, IconArrowRight } from '../../components/Icon'
import clsx from 'clsx'

export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel, isNext } = props

  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}
    >
      {!isNext ? <IconArrowLeft /> : null}
      <Typography variant="body2" className="pagination-nav__label">
        {title}
      </Typography>
      {isNext ? <IconArrowRight /> : null}
    </Link>
  )
}
