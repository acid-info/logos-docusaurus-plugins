// @ts-ignore
import Mermaid from '@docusaurus/theme-mermaid/lib/theme/Mermaid'
import type { WrapperProps } from '@docusaurus/types'
import type MermaidType from '@theme/Mermaid'
import React, { ReactElement } from 'react'
import { LightBoxWrapper } from '../../containers/LightBox/LightBox'

type Props = WrapperProps<typeof MermaidType>

export default function MermaidWrapper(props: Props): ReactElement {
  return (
    <LightBoxWrapper>
      <Mermaid {...props} />
    </LightBoxWrapper>
  )
}
