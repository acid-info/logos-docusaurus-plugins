import { supabase } from '../client/containers/CommentingSystem'

export type Comment = {
  id: number
  created_at: string
  author_id: string
  text: string
  page_path: string
}

export type CommentWithProfile = Comment & {
  profiles: {
    user_name: string
  }
}

export const postOneComment = async (
  text: string,
  pagePath: string,
): Promise<Comment[] | null> => {
  // Remove trailing slash if it exists
  const formattedPagePath = pagePath.endsWith('/')
    ? pagePath.slice(0, -1)
    : pagePath
  const { data, error } = await supabase
    .from('comments')
    .insert([{ text: text, page_path: formattedPagePath }])
    .select()

  if (error) {
    console.log('Error posting comment:', error)
    return null
  }

  return data as Comment[]
}

// typescript considers that the query returns an array of profiles objects rather than a single object
// to bypass this problem, we use the any type
// todo: look for a better solution
export const fetchComments = async (pagePath: string): Promise<any> => {
  const { data, error } = await supabase
    .from('comments')
    .select(
      `
      id,
      created_at,
      text,
      page_path,
      author_id,
      profiles ( user_name )
    `,
    )
    .eq('page_path', pagePath)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }
  return data || []
}

export const fetchOneComment = async (
  commentId: string,
): Promise<CommentWithProfile | null> => {
  const { data: newComment, error } = await supabase
    .from('comments')
    .select(
      `
      *,
      profiles (user_name)
    `,
    )
    .eq('id', commentId)
    .maybeSingle()

  if (error) {
    console.error('Error fetching comment:', error)
    return null
  }
  return newComment
}

export const subscribeToCommentsInsert = (
  callback: (payload: any) => void,
  path: string,
): (() => void) => {
  const channel = supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `page_path=eq.${path}`,
      },
      async (payload) => callback(payload),
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
