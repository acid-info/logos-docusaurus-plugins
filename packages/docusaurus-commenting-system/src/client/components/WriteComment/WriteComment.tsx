import React from 'react'
import { CardBody, Button } from '@acid-info/lsd-react'
import styles from './WriteComment.module.scss'

export type WriteCommentProps = {
  handleSend: () => void
  handleSignIn: () => void
  isSignedIn?: boolean
}

export const WriteComment: React.FC<WriteCommentProps> = ({
  handleSend,
  handleSignIn,
  isSignedIn = false,
}) => {
  return (
    <CardBody>
      <textarea
        className={styles.textarea}
        placeholder={isSignedIn ? 'Write a comment...' : 'Sign in to comment'}
        disabled={!isSignedIn}
        rows={3}
      />
      <div className={styles.actionContainer}>
        <Button size="small" onClick={isSignedIn ? handleSend : handleSignIn}>
          {isSignedIn ? 'Send' : 'Sign In'}
        </Button>
      </div>
    </CardBody>
  )
}
