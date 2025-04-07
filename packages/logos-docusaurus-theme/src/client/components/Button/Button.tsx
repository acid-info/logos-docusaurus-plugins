import clsx from 'clsx'
import React, { HTMLProps, ReactElement } from 'react'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const Button = (
  props: TProps & HTMLProps<HTMLButtonElement>,
): ReactElement => {
  const { children, className, ...rest } = props

  return (
    <button className={clsx('button', className)} {...(rest as any)}>
      {children}
    </button>
  )
}
