import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
export interface Comment {
  comment_id: number
  content: string
  created_at: string
  page_url: string
  username: string
  likes: number
}

interface CommentProviderProps {
  supabase: SupabaseClient, children : React.ReactNode
}

type CommentContextType = {
  comments: Comment[] | null
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  addComment: (content: string, username: string) => void
  updateLikes: (commentId: number, likes: number) => void
}

export const CommentContext = createContext<CommentContextType>({
  comments: null,
  setComments: () => [],
  addComment: () => {},
  updateLikes: () => {},
})

export const CommentProvider: React.FC<CommentProviderProps> = ( { supabase, children }: CommentProviderProps ) => {
  const [comments, setComments] = useState<Comment[]>([])
  const pageUrlRef = useRef<string>(window.location.href)

  const fetchComments = async (pageUrl: string) => {
    try {
      const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('page_url', pageUrl)
        .order("created_at", { ascending: true })

      if (error) {
        console.error('Error fetching comments:', error)
      } else {
        setComments(comments || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  };

  useEffect(() => {
    fetchComments(pageUrlRef.current);
  }, []);

  const addComment = async (content: string, username: string) => {
    try {
      const { data, error } = await supabase.from('comments').upsert({
        page_url: pageUrlRef.current,
        username,
        content
      })
      .select('*')
      
      if (error) console.error('Error adding comment:', error)
      
      data && setComments(prevComments => [...prevComments, data[0]])
    } catch (error) {
      console.error('Error connecting to Supabase:', error)
    }
  }

  const updateLikes = async (commentId: number, likes: number) => {
    try {
      const updatedLike = likes + 1
      const { data, error } = await supabase
        .from('comments')
        .update({likes: updatedLike})
        .match({comment_id: commentId})
        .select('*')

        if (error) console.error('Error updating comment:', error.message)

        else {
          const updatedComments = comments.map(comment =>
            comment.comment_id === commentId ? { ...data[0] } : comment
          )
          setComments(updatedComments)
        }
    } catch (error) {
      console.error('Error connecting to Supabase:', error)
    }
  }

  const value = {
    comments,
    setComments,
    addComment,
    updateLikes
  }

  return (
    <CommentContext.Provider value={value}>
      {children}
    </CommentContext.Provider>
  ) 
}

export const useCommentContext = () => {
  const context = useContext(CommentContext)

  if (!context) {
    throw new Error('useComments must be used in a Session Provider.')
  }

  return context
}
