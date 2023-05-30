import Container from '@docusaurus/theme-classic/lib/theme/CodeBlock/Container'
import type { WrapperProps } from '@docusaurus/types'
import type ContainerType from '@theme/CodeBlock/Container'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

type Props = WrapperProps<typeof ContainerType>

export default function ContainerWrapper(props: Props): JSX.Element {
  return (
    <>
      <Container
        {...props}
        className={clsx(props.className, styles.codeBlockContainer)}
      />
    </>
  )
}
