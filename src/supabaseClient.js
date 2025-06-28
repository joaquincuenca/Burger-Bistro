// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvmrstkeiqqitovmggqw.supabase.co'; // 🔁 Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2bXJzdGtlaXFxaXRvdm1nZ3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDIzMzQsImV4cCI6MjA2NjY3ODMzNH0.1eI9nd23SYttClrDD3GwYXazLvq_4rIfGQkMydlC918'; // 🔁 Replace with your anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
