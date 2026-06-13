import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Noticia } from '../../types'

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { carregarNoticias() }, [])

  async function carregarNoticias() {
    const { data } = await supabase.from('noticias').select('*').order('created_at', { ascending: false })
    setNoticias((data as Noticia[]) || [])
    setLoading(false)
  }

  async function deletar(id: string) {
    if (!confirm('Tem certeza que deseja deletar esta notícia?')) return
    await supabase.from('noticias').delete().eq('id', id)
    carregarNoticias()
  }

  async function togglePublicado(id: string, publicado: boolean) {
    await supabase.from('noticias').update({ publicado: !publicado }).eq('id', id)
    carregarNoticias()
  }

  const inp = { fontSize: 14, padding: '7px 13px' } as React.CSSProperties
  const btn = { border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', padding: '7px 12px', minHeight: 36 } as React.CSSProperties

  return (
    <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 3vw, 28px)' }}>Notícias</h1>
        <button onClick={() => navigate('/admin/noticias/novo')} className="btn-primary" style={inp}>
          ✍️ Nova Notícia
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 52 }} />)}
        </div>
      ) : noticias.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#727973', background: 'white', borderRadius: 12, border: '1px solid #e6e2d8' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📰</div>
          <p style={{ marginBottom: 16 }}>Nenhuma notícia cadastrada ainda.</p>
          <button onClick={() => navigate('/admin/noticias/novo')} className="btn-primary" style={inp}>
            Criar primeira notícia
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#f1eee4', borderBottom: '2px solid #e6e2d8' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Título</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Categoria</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Data</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map(n => (
                <tr key={n.id} style={{ borderBottom: '1px solid #e6e2d8', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fdf9ef'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                >
                  <td style={{ padding: '14px 16px', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span title={n.titulo}>{n.titulo}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#727973', whiteSpace: 'nowrap' }}>
                    <span style={{ background: '#f1eee4', padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600 }}>{n.categoria}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#727973', whiteSpace: 'nowrap' }}>
                    {new Date(n.data_publicacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <span style={{
                      display: 'inline-block',
                      background: n.publicado ? '#c7ebd4' : '#ffdad6',
                      color: n.publicado ? '#012113' : '#93000a',
                      padding: '4px 12px', borderRadius: 9999,
                      fontSize: 11, fontWeight: 700,
                    }}>
                      {n.publicado ? '✓ Publicado' : '◯ Rascunho'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'nowrap' }}>
                      <button
                        onClick={() => navigate(`/admin/noticias/${n.id}`)}
                        style={{ ...btn, background: '#163526', color: 'white' }}
                        title="Editar"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => togglePublicado(n.id, n.publicado)}
                        style={{ ...btn, background: n.publicado ? '#727973' : '#96472b', color: 'white' }}
                        title={n.publicado ? 'Despublicar' : 'Publicar'}
                      >
                        {n.publicado ? '🔒' : '🔓'}
                      </button>
                      <button
                        onClick={() => deletar(n.id)}
                        style={{ ...btn, background: '#ba1a1a', color: 'white' }}
                        title="Deletar"
                        aria-label={`Deletar notícia ${n.titulo}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
