import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import {
  NavigateBeforeIcon,
  NavigateNextIcon,
  Typography,
} from '@acid-info/lsd-react'
import { IconArrowLeft, IconArrowRight } from '@logos-theme/components/Icon'

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
