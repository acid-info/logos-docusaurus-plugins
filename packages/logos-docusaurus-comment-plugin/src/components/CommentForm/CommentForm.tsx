
import React, { useState } from 'react'
import { Card, CardBody, Button, CardHeader } from '@acid-info/lsd-react'
import { useCommentContext } from '../context/CommentsContext/comments'
import { useAuth } from '../context/AuthContext'
import './CommentForm.css'


const CommentForm: React.FC = () => {
  // const { session, user } = useAuth()
  const [content, setContent] = useState<string>('')
  const { addComment } = useCommentContext()
  const { signIn } = useAuth()
  const session = true
  const user = {
    id: "smudgy-g"
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setContent('')
    addComment(content, user?.id as string)
  }

  return (
    <div className="mb-4">
      <Card size="small">
        {session && user && (
          <CardHeader>
            {user.id}
          </CardHeader>
        )}
        <CardBody>
          <form onSubmit={handleSubmit}>
            <textarea
              id={"content"}
              rows={3}
              aria-label={"New comment text area"}
              placeholder={session ? "Leave a comment here..." : "Your must be logged in to leave a comment"}
              disabled={!session}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              />

            <div className="flex justify-end w-full">
              {session ? (
                <Button 
                type='submit'
                variant={"outlined"} 
                size={"medium"}
                >
                  Submit
                </Button>
              ) :(
                <Button 
                variant={"outlined"} 
                size={"small"}
                onClick={signIn}
                >
                  Sign in.
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default CommentForm