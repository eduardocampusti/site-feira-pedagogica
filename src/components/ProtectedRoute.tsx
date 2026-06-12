import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session)
      setLoading(false)
      if (!session) {
        supabase.auth.onAuthStateChange((_, session) => {
          setAuthenticated(!!session)
          setLoading(false)
        })
      }
    })
  }, [])

  if (loading) return <div style={{ padding: 80, textAlign: 'center' }}>Verificando autenticação...</div>
  return authenticated ? <>{children}</> : <Navigate to="/admin/login" />
}
