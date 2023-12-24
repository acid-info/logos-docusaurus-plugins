import React from 'react'
import Content from '@theme-original/DocItem/Content'
import { CommentingSystem } from '@acid-info/docusaurus-commenting-system/lib/client/'

export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <div style={{ marginTop: '4rem' }} />
      <CommentingSystem />
    </>
  )
}
