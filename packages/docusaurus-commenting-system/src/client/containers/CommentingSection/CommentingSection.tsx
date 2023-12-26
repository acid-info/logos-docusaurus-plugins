import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { parseISO, format } from 'date-fns'
import { Comment } from '../../components/Comment'
import { WriteComment } from '../../components/WriteComment'
import { signInWithGitHub, getUserData } from '../../../server/auth'
import {
  postOneComment,
  fetchComments,
  fetchOneComment,
  subscribeToCommentsInsert,
  type CommentWithProfile,
} from '../../../server/comments'
import styles from './CommentingSection.module.scss'

type CommentData = {
  id: number
  username: string
  comment: string
  date: string
}

export const CommentingSection: React.FC = () => {
  const location = useLocation()
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [commentsList, setCommentsList] = useState<CommentData[]>([])

  const convertDateFormat = (inputDate: string): string => {
    const date = parseISO(inputDate)
    return format(date, 'MMM d, yyyy')
  }

  const getFormattedPath = (): string => {
    const path = location.pathname
    // Remove trailing slash if it exists
    const formattedPagePath = path.endsWith('/') ? path.slice(0, -1) : path
    return formattedPagePath
  }

  const checkUserSignedIn = async () => {
    const data = await getUserData()
    if (data) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }

  const fetchCommentsList = async () => {
    const data = await fetchComments(getFormattedPath())
    setCommentsList(
      data.map((commentFromDB: CommentWithProfile) => ({
        id: commentFromDB.id,
        username: commentFromDB.profiles.user_name,
        comment: commentFromDB.text,
        date: convertDateFormat(commentFromDB.created_at),
      })),
    )
  }

  const subscribeToNewComments = () => {
    const unsubscibe = subscribeToCommentsInsert(async (payload) => {
      const newCommentId = payload?.new?.id
      if (!newCommentId) return

      const newComment = await fetchOneComment(newCommentId)
      if (!newComment) return

      setCommentsList((prev) => [
        {
          id: newComment.id,
          username: newComment.profiles.user_name,
          comment: newComment.text,
          date: convertDateFormat(newComment.created_at),
        },
        ...prev,
      ])
    }, getFormattedPath())

    return unsubscibe
  }

  const handleSignIn = async () => {
    await signInWithGitHub(window.location.href)
  }

  const handleSend = async (commentText: string) => {
    await postOneComment(commentText, location.pathname)
  }

  useEffect(() => {
    // check if user is signed in
    checkUserSignedIn()
    // fetch all comments on first load
    fetchCommentsList()
    // subscribe to new comments
    const unsubscibe = subscribeToNewComments()
    return () => {
      unsubscibe()
    }
  }, [])

  return (
    <div>
      <WriteComment
        handleSend={(text) => handleSend(text)}
        handleSignIn={handleSignIn}
        isSignedIn={isSignedIn}
      />
      {commentsList.length > 0 && (
        <>
          <div className={styles.commentsContainer}>
            <span>{`${commentsList.length} comment${
              commentsList.length > 1 ? 's' : ''
            }`}</span>
            {commentsList.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.username}
                comment={comment.comment}
                date={comment.date}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
