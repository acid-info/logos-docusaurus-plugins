import { SupabaseClient, createClient } from  '@supabase/supabase-js';

interface SupabaseModuleOptions {
  supabaseURL: string;
  supabasePublicKey: string;
}

export const initializeSupabase = ({ supabaseURL, supabasePublicKey }: SupabaseModuleOptions) => {
  const supabase: SupabaseClient = createClient(supabaseURL, supabasePublicKey);

  return {
    getSupabase: () => supabase,
  };
};