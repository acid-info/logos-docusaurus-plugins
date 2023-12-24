import { formatTimestamp } from '../../utils/timestamp'
import { Comment, useCommentContext } from '../context/CommentsContext/comments'
import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@acid-info/lsd-react'
import './CommentCard.css'
import { useAuth } from '../context/AuthContext'

const CommentCard = ({ data}: { data: Comment }) => {
  const { updateLikes } = useCommentContext()
  const { session } = useAuth()
  const { comment_id, content, created_at, likes, username } = data

  return (
    <Card size={"small"}>
      <CardHeader>
        <div className="flex justify-between w-full">
          <span>{username}</span>
          <span className="text-xs">{formatTimestamp(created_at)}</span>
        </div>
      </CardHeader>
      <CardBody>
        <p>{content}</p>

        
        <div className="flex justify-between items-end">
          <p className="text-xs">{likes} Likes</p>
          <ButtonGroup>
            <Button variant={"outlined"} size={"small"} onClick={() => updateLikes(comment_id, likes)} disabled={!session}>Like</Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  )
}

export default CommentCard