import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Edicao } from '../types'

export function useEdicoes() {
  const [data, setData]       = useState<Edicao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('edicoes')
          .select('*')
          .eq('publicado', true)
          .order('ano', { ascending: false })
        if (dbError) throw dbError
        if (isMounted) { setData((dbData as unknown as Edicao[]) || []); setError(null) }
      } catch (err: any) {
        console.error('Erro ao buscar edições:', err)
        if (isMounted) setError(err.message || 'Erro ao carregar edições')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [])

  return { data, loading, error }
}

export function useEdicao(id: string | null | undefined) {
  const [data, setData]       = useState<Edicao | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!id) { setData(null); setLoading(false); return }
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('edicoes')
          .select('*')
          .eq('id', id)
          .single()
        if (dbError) throw dbError
        if (isMounted) { setData(dbData as unknown as Edicao); setError(null) }
      } catch (err: any) {
        console.error(`Erro ao buscar edição ${id}:`, err)
        if (isMounted) setError(err.message || 'Erro ao carregar edição')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [id])

  return { data, loading, error }
}
