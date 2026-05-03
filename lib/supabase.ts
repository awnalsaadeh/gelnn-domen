import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type Child = {
  id: string;
  user_id: string;
  name: string;
  birth_date: string | null;
  language: string;
  created_at: string;
};

export type Category = {
  id: string;
  user_id: string;
  child_id: string;
  name_ar: string;
  name_en: string;
  name_es: string;
  color: string;
  emoji: string;
  created_at: string;
};

export type Word = {
  id: string;
  category_id: string;
  user_id: string;
  child_id: string;
  text_ar: string;
  text_en: string;
  text_es: string;
  image_url: string | null;
  status: "pending" | "active" | "retired";
  introduced_at: string | null;
  retire_at: string | null;
  times_shown: number;
  created_at: string;
};

export type Session = {
  id: string;
  user_id: string;
  child_id: string;
  word_id: string;
  session_number: number;
  day: string;
  completed_at: string;
};
