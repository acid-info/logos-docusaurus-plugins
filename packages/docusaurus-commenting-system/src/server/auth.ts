import { supabase } from '../client/containers/CommentingSystem'
import { User } from '@supabase/supabase-js'

export const signInWithGitHub = async (
  redirectUrl?: string,
): Promise<boolean> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectUrl || undefined,
    },
  })

  if (error) {
    console.error('Error signing in', error)
    return false
  }

  return true
}

export const getUserData = async (): Promise<User | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
