import React, { useState } from 'react'
import { CardBody, Button } from '@acid-info/lsd-react'
import styles from './WriteComment.module.scss'

export type WriteCommentProps = {
  handleSend: (comment: string) => void
  handleSignIn: () => void
  isSignedIn?: boolean
}

export const WriteComment: React.FC<WriteCommentProps> = ({
  handleSend,
  handleSignIn,
  isSignedIn = false,
}) => {
  const [comment, setComment] = useState('')

  const onSendClick = () => {
    const commentToSend = comment.trim()
    if (commentToSend) {
      handleSend(commentToSend)
      setComment('')
    }
  }

  return (
    <CardBody>
      <textarea
        className={styles.textarea}
        placeholder={isSignedIn ? 'Write a comment...' : 'Sign in to comment'}
        disabled={!isSignedIn}
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className={styles.actionContainer}>
        <Button
          size="small"
          onClick={isSignedIn ? onSendClick : handleSignIn}
          disabled={isSignedIn && comment.length === 0}
        >
          {isSignedIn ? 'Send' : 'Sign In'}
        </Button>
      </div>
    </CardBody>
  )
}
