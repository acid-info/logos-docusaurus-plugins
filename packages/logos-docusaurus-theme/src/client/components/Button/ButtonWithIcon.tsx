import React, { HTMLProps, ReactElement } from 'react'
import { Button } from './Button'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
  icon: ReactElement
}

export const ButtonWithIcon = ({
  children,
  icon,
  ...rest
}: TProps & HTMLProps<HTMLButtonElement>): ReactElement => {
  return (
    <Button {...rest}>
      <div className={styles.buttonWithIconContainer}>
        <div>{children}</div>
        {icon}
      </div>
    </Button>
  )
}
