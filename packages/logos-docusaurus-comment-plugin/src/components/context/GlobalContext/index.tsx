import { SupabaseClient } from '@supabase/supabase-js'
import React from 'react'
import { AuthProvider } from '../AuthContext'
import { CommentProvider } from '../CommentsContext'

interface CombinedProviderProps {
  supabase: SupabaseClient
  children: React.ReactNode
}


const GlobalCommentContextProvider: React.FC<CombinedProviderProps> = ({ supabase, children }) => {
  return (
    <AuthProvider supabase={supabase}>
      <CommentProvider supabase={supabase}>
        {children}
      </CommentProvider>
    </AuthProvider>
  )
}

export default GlobalCommentContextProvider