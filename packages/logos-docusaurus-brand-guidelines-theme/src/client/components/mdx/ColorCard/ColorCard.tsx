import React from 'react'
import styles from './ColorCard.module.scss'
import clsx from 'clsx'
import { Typography } from '@acid-info/lsd-react'

export type ColorCardProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'title' | 'color'
> & {
  color: string
  title: React.ReactNode
  fullWidth?: boolean
  variables?: {
    name: string
    value: string
  }[]
}

export const ColorCard: React.FC<ColorCardProps> = ({
  title,
  color,
  fullWidth,
  variables = [],
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        props.className,
        styles.root,
        fullWidth && styles.fullWidth,
      )}
    >
      <div className={styles.color} style={{ background: color }}></div>
      <div className={styles.info}>
        <Typography
          className={styles.title}
          variant="subtitle1"
          component="div"
        >
          {title}
        </Typography>
        <div className={styles.variables}>
          {variables.map((variable, index) => (
            <React.Fragment key={index}>
              <Typography variant="label2">{variable.name}</Typography>
              <Typography variant="label2">{variable.value}</Typography>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
