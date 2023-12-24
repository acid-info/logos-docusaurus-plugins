
import { Card, CardBody } from '@acid-info/lsd-react'
import { useCommentContext } from '../context/CommentsContext/comments'
import CommentForm from '../CommentForm'
import CommentCard from '../CommentCard'
import './CommentComponent.css'

const CommentComponent = () => {
  const { comments } = useCommentContext()

  return (
    <>
      <CommentForm />
      <div className="space-y-3">
        {comments ? (
          comments.map((comment) => (
            <CommentCard  data={comment} key={comment.comment_id}/>
          ))
        ) : (
          <>
            <Card>
              <CardBody>
                <p>No comments yet. Be the first to comment.</p>
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </>
  )
}

export default CommentComponent