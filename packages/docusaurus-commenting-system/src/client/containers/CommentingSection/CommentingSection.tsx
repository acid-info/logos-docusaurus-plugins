import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Comment } from '../../components/Comment'
import { WriteComment } from '../../components/WriteComment'
import styles from './CommentingSection.module.scss'

type CommentData = {
  id: number
  username: string
  comment: string
  date: string
}

export const CommentingSection: React.FC = () => {
  const location = useLocation() // location.pathname
  const [commentsList, setCommentsList] = useState<CommentData[]>([])

  useEffect(() => {
    setCommentsList([
      {
        id: 1,
        username: 'John Doe',
        comment:
          "This is a comment\nAnother line. Trying to make it longer. I have no idea what to write here. I'm just trying to make it longer.",
        date: '2021-09-01',
      },
      {
        id: 2,
        username: 'Jane Doe',
        comment: 'This is another comment',
        date: '2021-09-02',
      },
    ])
  }, [])

  return (
    <div>
      <WriteComment
        handleSend={() => console.log('Send')}
        handleSignIn={() => console.log('Sign In')}
        isSignedIn={true}
      />
      {commentsList.length && (
        <>
          <div className={styles.commentsContainer}>
            <span>{`${commentsList.length} comment${
              commentsList.length !== 1 && 's'
            }`}</span>
            {commentsList.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.username}
                comment={comment.comment}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
