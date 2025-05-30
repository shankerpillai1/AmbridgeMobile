import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pauupgpcevkccuhjmlft.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdXVwZ3BjZXZrY2N1aGptbGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDc1MDgsImV4cCI6MjA2NDEyMzUwOH0.wwHn28g8Of8YhQZp6ZHmOTsCa9ysvmEIdj92ycIDXkg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);