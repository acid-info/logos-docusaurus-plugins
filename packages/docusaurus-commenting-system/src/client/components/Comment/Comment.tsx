import React from 'react'
import { CardBody } from '@acid-info/lsd-react'
import styles from './Comment.module.scss'

export type CommentProps = {
  username: string
  comment: string
}

export const Comment: React.FC<CommentProps> = ({ username, comment }) => {
  return (
    <CardBody>
      <div className={styles.username}>{username}</div>
      <div>{comment}</div>
    </CardBody>
  )
}
