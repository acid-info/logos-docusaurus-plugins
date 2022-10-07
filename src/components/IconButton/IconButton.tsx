import clsx from 'clsx'
import React from 'react'
import styles from './IconButton.module.scss'

export const IconButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {}
> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={clsx('clean-btn', styles.root, className)}
      {...props}
    >
      {children}
    </button>
  )
}
