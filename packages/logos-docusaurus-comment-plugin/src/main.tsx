import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider, defaultThemes } from '@acid-info/lsd-react'
import { initializeSupabase } from './supabase'
import { GlobalCommentContextProvider } from './components'

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY

const { getSupabase } = initializeSupabase({ supabaseURL, supabasePublicKey });
const supabase = getSupabase(); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultThemes.light}>
      <GlobalCommentContextProvider supabase={supabase}>
        <App />
      </GlobalCommentContextProvider>
  </ThemeProvider>,
  </React.StrictMode>,
)
