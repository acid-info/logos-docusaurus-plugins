import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { CommentingSection } from '../CommentingSection'

const supabaseUrl = window.SUPABASE_URL
const supabaseAnonKey = window.SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const CommentingSystem: React.FC = () => {
  return <CommentingSection />
}
