import CodeBlock from '@docusaurus/theme-classic/lib/theme/CodeBlock'
import type { WrapperProps } from '@docusaurus/types'
import type CodeBlockType from '@theme/CodeBlock'
import React, { ReactElement } from 'react'

type Props = WrapperProps<typeof CodeBlockType>

export default function CodeBlockWrapper(props: Props): ReactElement {
  return (
    <>
      <CodeBlock {...props} />
    </>
  )
}
