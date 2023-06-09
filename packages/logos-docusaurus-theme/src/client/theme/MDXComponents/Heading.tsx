import Heading from '@docusaurus/theme-classic/lib/theme/MDXComponents/Heading'
import type { Props } from '@theme/MDXComponents/Heading'
import React from 'react'
import { useMDXEnhancementElements } from '../../containers/MDXEnhacement/MDXEnhancement.context'

export default function MDXHeading(props: Props): JSX.Element {
  const after = useMDXEnhancementElements('heading', 'after', props)

  return (
    <>
      <Heading {...props} />
      {after}
    </>
  )
}
