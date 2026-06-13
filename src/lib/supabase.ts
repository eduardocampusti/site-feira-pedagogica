import { createClient } from '@supabase/supabase-js'

// Credenciais embutidas para deploy na Hostinger
// (anon key é pública por natureza — segurança feita via RLS no Supabase)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nfabfjbskdreuxdhuswz.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYWJmamJza2RyZXV4ZGh1c3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMzExNjYsImV4cCI6MjA5NjgwNzE2Nn0.TG-yjR4KD7kXhE9E31Sg92zmrCUCDNDQA2rztOiqZ6M'

export const supabase = createClient(supabaseUrl, supabaseKey)
