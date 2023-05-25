import React, { HTMLProps } from 'react'
import { Button } from './Button'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
  icon: JSX.Element
}

export const ButtonWithIcon = ({
  children,
  icon,
  ...rest
}: TProps & HTMLProps<HTMLButtonElement>): JSX.Element => {
  return (
    <Button {...rest}>
      <div className={styles.buttonWithIconContainer}>
        <div>{children}</div>
        {icon}
      </div>
    </Button>
  )
}
