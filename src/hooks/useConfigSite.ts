import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ConfigSite } from '../types'

const CACHE_KEY = 'fprs_config_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

function lerCache(): ConfigSite | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL) return null
    return data as ConfigSite
  } catch {
    return null
  }
}

function salvarCache(data: ConfigSite) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {}
}

export function useConfigSite() {
  // Inicia já com o cache — sem delay visual
  const [config, setConfig] = useState<ConfigSite | null>(lerCache)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarConfig()
  }, [])

  async function carregarConfig() {
    try {
      const { data, error: err } = await supabase
        .from('config_site')
        .select('*')
        .single()

      if (err) throw err
      const cfg = data as ConfigSite
      setConfig(cfg)
      salvarCache(cfg)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { config, loading, error, refetch: carregarConfig }
}
