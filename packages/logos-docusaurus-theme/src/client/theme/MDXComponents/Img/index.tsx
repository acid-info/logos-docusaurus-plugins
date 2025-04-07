import Img from '@docusaurus/theme-classic/lib/theme/MDXComponents/Img'
import type { WrapperProps } from '@docusaurus/types'
import type ImgType from '@theme/MDXComponents/Img'
import React, { ReactElement } from 'react'
import { LightBoxWrapper } from '../../../containers/LightBox/LightBox'

type Props = WrapperProps<typeof ImgType>

export default function ImgWrapper(props: Props): ReactElement {
  return (
    <LightBoxWrapper>
      <Img {...props} />
    </LightBoxWrapper>
  )
}
