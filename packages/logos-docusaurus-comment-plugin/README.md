# Comment Plugin for Logos Documentation Websites

## INSTALLATION
1. You willl need to set up a Supabase database and initialise a table with the following SQL command. PLease make sure that you have authentication with github enabled and set up
```
CREATE TABLE IF NOT EXISTS comments (
  comment_id serial primary key,
  page_url text,
  username text,
  content text,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  likes integer
);

```
2. Set up the context for the comment plugin. To do this, pass in your variables for your Supabase database with Github OAuth enabled. Pass the variables in and initialise a client to pass to the global context provider.
```
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

```

2. In the components, you can pass in the ```<CommentComponent />``` and the plugin will do the rest!

## Extra Information

### Database Structure

The database is structured simply:
- comment_id: serialized id for eachof the comments,
- page_url: takes the page url so that the appropriate comments can be returved from the database,
- username: this sis the authentiacated users Github handle,
- content: the content of the comment,
- created_at: The generated time of each comment,
- likes: the number of likes for each comment

The Comment context uses the current page of the window (this can be changed to the location if you wish) to fetch

## Problems

Unfortunately the Supabase authentication is not working, giving me cors errors. This is most likely due to the protocol not being secure. Wierd since I have had no troubles in the past. 

Beacause of this I was unable to get the proper details to then assign the username for the comments.

## Imporvements
- Look into supabase realtime subscriptions to update all comments in realtime