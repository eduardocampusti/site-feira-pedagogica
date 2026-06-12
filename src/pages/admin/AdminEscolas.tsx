import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Escola } from '../../types'

export default function AdminEscolas() {
  const [escolas, setEscolas] = useState<Escola[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    carregarEscolas()
  }, [])

  async function carregarEscolas() {
    const { data } = await supabase.from('escolas').select('*').order('created_at')
    setEscolas((data as Escola[]) || [])
  }

  async function deletar(id: string) {
    if (!confirm('Deletar?')) return
    await supabase.from('escolas').delete().eq('id', id)
    carregarEscolas()
  }

  return (
    <div style={{ flex: 1, padding: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28 }}>Escolas</h1>
        <button onClick={() => navigate('/admin/escolas/novo')} className="btn-primary">🏫 Nova Escola</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {escolas.map(e => (
          <div key={e.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #e6e2d8', padding: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#163526', marginBottom: 8 }}>{e.nome}</h3>
            <p style={{ fontSize: 13, color: '#727973', marginBottom: 12 }}>📍 {e.localidade}</p>
            <p style={{ fontSize: 12, color: '#424843', marginBottom: 12 }}><strong>Turmas:</strong> {e.turmas}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigate(`/admin/escolas/${e.id}`)} style={{ flex: 1, padding: '8px', background: '#163526', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Editar</button>
              <button onClick={() => deletar(e.id)} style={{ flex: 1, padding: '8px', background: '#ba1a1a', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
