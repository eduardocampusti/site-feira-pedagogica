import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Edicao } from '../../types'

export default function AdminEdicoes() {
  const [edicoes, setEdicoes] = useState<Edicao[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    carregarEdicoes()
  }, [])

  async function carregarEdicoes() {
    const { data } = await supabase.from('edicoes').select('*').order('ano', { ascending: false })
    setEdicoes((data as Edicao[]) || [])
  }

  async function deletar(id: string) {
    if (!confirm('Deletar?')) return
    await supabase.from('edicoes').delete().eq('id', id)
    carregarEdicoes()
  }

  return (
    <div style={{ flex: 1, padding: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28 }}>Edições do Projeto</h1>
        <button onClick={() => navigate('/admin/edicoes/novo')} className="btn-primary">📅 Nova Edição</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {edicoes.map(e => (
          <div key={e.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #e6e2d8', overflow: 'hidden' }}>
            {e.foto_capa && <img src={e.foto_capa} alt={e.nome} style={{ width: '100%', height: 160, objectFit: 'cover' }} />}
            <div style={{ padding: 16 }}>
              <span style={{ display: 'inline-block', background: '#e5a864', color: '#3a1a00', padding: '4px 12px', borderRadius: 9999, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>ANO {e.ano}</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#163526', marginBottom: 4 }}>{e.nome}</h3>
              <p style={{ fontSize: 13, color: '#727973', marginBottom: 12 }}>{e.tema}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => navigate(`/admin/edicoes/${e.id}`)} style={{ flex: 1, padding: '8px', background: '#163526', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Editar</button>
                <button onClick={() => deletar(e.id)} style={{ flex: 1, padding: '8px', background: '#ba1a1a', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Deletar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
