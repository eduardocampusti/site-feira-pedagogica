import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { FotoGaleria } from '../types'

export function useGaleria(edicao_id?: string, destaque?: boolean) {
  const [data, setData]       = useState<FotoGaleria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        let query = supabase
          .from('galeria')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)

        if (edicao_id)          query = query.eq('edicao_id', edicao_id)
        if (destaque !== undefined) query = query.eq('destaque', destaque)

        const { data: dbData, error: dbError } = await query
        if (dbError) throw dbError
        if (isMounted) { setData((dbData as unknown as FotoGaleria[]) || []); setError(null) }
      } catch (err: any) {
        console.error('Erro ao buscar galeria:', err)
        if (isMounted) setError(err.message || 'Erro ao carregar galeria')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [edicao_id, destaque])

  return { data, loading, error }
}
