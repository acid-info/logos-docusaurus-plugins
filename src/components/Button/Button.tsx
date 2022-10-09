import clsx from 'clsx'
import React, { HTMLProps } from 'react'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const Button = (
  props: TProps & HTMLProps<HTMLButtonElement>,
): JSX.Element => {
  const { children, className, ...rest } = props

  return (
    <button className={clsx('button', className)} {...(rest as any)}>
      {children}
    </button>
  )
}
