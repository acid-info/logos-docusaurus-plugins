import React from 'react'
import { CardBody } from '@acid-info/lsd-react'
import styles from './Comment.module.scss'

export type CommentProps = {
  username: string
  comment: string
  date: string
}

export const Comment: React.FC<CommentProps> = ({
  username,
  comment,
  date,
}) => {
  return (
    <CardBody>
      <div className={styles.commentHeader}>
        <span className={styles.username}>{username}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <div>{comment}</div>
    </CardBody>
  )
}
