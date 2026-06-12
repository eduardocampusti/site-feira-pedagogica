import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Noticia } from '../types'

interface FiltrosNoticias {
  categoria?: string
  edicao_id?: string
  limit?: number
}

export function useNoticias(filtros?: FiltrosNoticias) {
  const [data, setData]       = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const categoria = filtros?.categoria
  const edicao_id = filtros?.edicao_id
  const limit     = filtros?.limit ?? 20

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        let query = supabase
          .from('noticias')
          .select('*')
          .eq('publicado', true)
          .order('data_publicacao', { ascending: false })

        if (categoria) query = query.eq('categoria', categoria)
        if (edicao_id) query = query.eq('edicao_id', edicao_id)
        query = query.limit(limit)

        const { data: dbData, error: dbError } = await query
        if (dbError) throw dbError
        if (isMounted) { setData((dbData as unknown as Noticia[]) || []); setError(null) }
      } catch (err: any) {
        console.error('Erro ao buscar notícias:', err)
        if (isMounted) setError(err.message || 'Erro ao carregar notícias')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [categoria, edicao_id, limit])

  return { data, loading, error }
}

export function useNoticia(id: string | null | undefined) {
  const [data, setData]       = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!id) { setData(null); setLoading(false); return }
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('noticias')
          .select('*')
          .eq('id', id)
          .single()
        if (dbError) throw dbError
        if (isMounted) { setData(dbData as unknown as Noticia); setError(null) }
      } catch (err: any) {
        console.error(`Erro ao buscar notícia ${id}:`, err)
        if (isMounted) setError(err.message || 'Erro ao carregar notícia')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [id])

  return { data, loading, error }
}
