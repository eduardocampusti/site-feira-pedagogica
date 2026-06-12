import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Escola } from '../types'

export function useEscolas() {
  const [data, setData]       = useState<Escola[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('escolas')
          .select('*')
          .eq('publicado', true)
          .order('created_at', { ascending: true })
        if (dbError) throw dbError
        if (isMounted) { setData((dbData as unknown as Escola[]) || []); setError(null) }
      } catch (err: any) {
        console.error('Erro ao buscar escolas:', err)
        if (isMounted) setError(err.message || 'Erro ao carregar escolas')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [])

  return { data, loading, error }
}
