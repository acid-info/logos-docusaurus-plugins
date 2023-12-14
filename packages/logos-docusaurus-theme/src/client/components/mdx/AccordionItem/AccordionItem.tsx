import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import './AccordionItem.scss'
import { Typography } from '@acid-info/lsd-react'
import { IconAdd, IconRemove } from '../../Icon'
import uniqueId from 'lodash/uniqueId'

export type AccordionItemProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'title'
> & {
  open?: boolean
  title: React.ReactNode
  onToggle?: (open: boolean) => void
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  open: openProp,
  onToggle,
  title,
  className,
  children,
  ...props
}) => {
  const id = uniqueId('accordion-item-')
  const [open, setOpen] = useState(openProp ?? false)

  if (typeof openProp !== 'undefined' && openProp !== open) {
    setOpen(openProp)
  }

  const handleToggle = () => {
    if (typeof openProp !== 'undefined') {
      onToggle && onToggle(!open)
    } else {
      setOpen((val) => !val)
    }
  }

  return (
    <div
      className={clsx(
        className,
        'mdx-accordion-item',
        open && 'mdx-accordion-item--open',
      )}
      {...props}
    >
      <input type="checkbox" id={id} checked={open} />
      <div
        role="button"
        className="mdx-accordion-item__header"
        onClick={() => handleToggle()}
      >
        <Typography
          className="mdx-accordion-item__title"
          variant="h5"
          component="label"
          htmlFor={id}
        >
          {title}
        </Typography>
        <div className="mdx-accordion-item__icon">
          {open ? <IconRemove /> : <IconAdd />}
        </div>
      </div>
      <div className="mdx-accordion-item__content-wrapper">
        <div className="mdx-accordion-item__content">{children}</div>
      </div>
    </div>
  )
}
