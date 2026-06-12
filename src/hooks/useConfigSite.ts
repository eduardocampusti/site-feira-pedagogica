import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ConfigSite } from '../types'

export function useConfigSite() {
  const [config, setConfig] = useState<ConfigSite | null>(null)
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
      setConfig(data as ConfigSite)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { config, loading, error, refetch: carregarConfig }
}
