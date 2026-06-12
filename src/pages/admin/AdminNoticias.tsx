import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Noticia } from '../../types'

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    carregarNoticias()
  }, [])

  async function carregarNoticias() {
    const { data } = await supabase.from('noticias').select('*').order('created_at', { ascending: false })
    setNoticias((data as Noticia[]) || [])
    setLoading(false)
  }

  async function deletar(id: string) {
    if (!confirm('Deletar esta notícia?')) return
    await supabase.from('noticias').delete().eq('id', id)
    carregarNoticias()
  }

  async function togglePublicado(id: string, publicado: boolean) {
    await supabase.from('noticias').update({ publicado: !publicado }).eq('id', id)
    carregarNoticias()
  }

  return (
    <div style={{ flex: 1, padding: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28 }}>Notícias</h1>
        <button onClick={() => navigate('/admin/noticias/novo')} className="btn-primary">✍️ Nova Notícia</button>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e6e2d8', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1eee4', borderBottom: '1px solid #e6e2d8' }}>
                <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Título</th>
                <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Categoria</th>
                <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Data</th>
                <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: 16, textAlign: 'center', fontWeight: 600 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map(n => (
                <tr key={n.id} style={{ borderBottom: '1px solid #e6e2d8' }}>
                  <td style={{ padding: 16 }}>{n.titulo}</td>
                  <td style={{ padding: 16, fontSize: 13, color: '#727973' }}>{n.categoria}</td>
                  <td style={{ padding: 16, fontSize: 13, color: '#727973' }}>{new Date(n.data_publicacao).toLocaleDateString('pt-BR')}</td>
                  <td style={{ padding: 16 }}>
                    <span style={{ display: 'inline-block', background: n.publicado ? '#c7ebd4' : '#ffdad6', color: n.publicado ? '#012113' : '#93000a', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600 }}>
                      {n.publicado ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td style={{ padding: 16, textAlign: 'center', display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button onClick={() => navigate(`/admin/noticias/${n.id}`)} style={{ padding: '6px 12px', background: '#163526', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>✏️ Editar</button>
                    <button onClick={() => togglePublicado(n.id, n.publicado)} style={{ padding: '6px 12px', background: '#96472b', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                      {n.publicado ? '🔒 Despub' : '🔓 Publicar'}
                    </button>
                    <button onClick={() => deletar(n.id)} style={{ padding: '6px 12px', background: '#ba1a1a', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>🗑️ Deletar</button>
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
