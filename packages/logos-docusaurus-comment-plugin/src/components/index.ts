export { initializeSupabase } from "../supabase";

export {default as GlobalCommentContextProvider} from "./context/GlobalContext";
export { default as CommentCard } from "./CommentCard";
export { default as CommentComponent } from "./CommentComponent";
export { default as CommentForm } from "./CommentForm";
export { AuthProvider, useAuth } from './context/AuthContext'
export { CommentProvider, useCommentContext } from './context/CommentsContext'