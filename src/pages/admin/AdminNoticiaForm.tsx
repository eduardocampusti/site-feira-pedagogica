import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Edicao } from '../../types'

export default function AdminNoticiaForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [edicoes, setEdicoes] = useState<Edicao[]>([])
  const [form, setForm] = useState({ titulo: '', resumo: '', conteudo: '', imagem_capa: '', categoria: 'educacao', edicao_id: '', data_publicacao: new Date().toISOString().split('T')[0], publicado: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregarEdicoes()
    if (id) carregarNoticia()
  }, [id])

  async function carregarEdicoes() {
    const { data } = await supabase.from('edicoes').select('*')
    setEdicoes((data as Edicao[]) || [])
  }

  async function carregarNoticia() {
    const { data } = await supabase.from('noticias').select('*').eq('id', id).single()
    if (data) setForm(data as any)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, edicao_id: form.edicao_id || null }
    if (id) {
      await supabase.from('noticias').update(payload).eq('id', id)
    } else {
      await supabase.from('noticias').insert([payload])
    }
    setLoading(false)
    navigate('/admin/noticias')
  }

  return (
    <div style={{ flex: 1, padding: 40, maxWidth: 1000 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>{id ? 'Editar' : 'Nova'} Notícia</h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Título</label>
          <input type="text" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} required style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Resumo</label>
          <textarea value={form.resumo} onChange={e => setForm({...form, resumo: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 80 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Conteúdo</label>
          <textarea value={form.conteudo} onChange={e => setForm({...form, conteudo: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 200 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Categoria</label>
            <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }}>
              <option value="educacao">Educação</option>
              <option value="agricultura">Agricultura</option>
              <option value="cultura">Cultura</option>
              <option value="sustentabilidade">Sustentabilidade</option>
              <option value="empreendedorismo">Empreendedorismo</option>
              <option value="galeria">Galeria</option>
              <option value="eventos">Eventos</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Data</label>
            <input type="date" value={form.data_publicacao} onChange={e => setForm({...form, data_publicacao: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>URL Imagem Capa</label>
            <input type="url" value={form.imagem_capa} onChange={e => setForm({...form, imagem_capa: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Edição</label>
            <select value={form.edicao_id} onChange={e => setForm({...form, edicao_id: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }}>
              <option value="">Sem edição</option>
              {edicoes.map(e => (
                <option key={e.id} value={e.id}>Ano {e.ano} - {e.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="checkbox" checked={form.publicado} onChange={e => setForm({...form, publicado: e.target.checked})} style={{ width: 18, height: 18, cursor: 'pointer' }} />
          <label style={{ fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Publicar</label>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 24px' }}>
            {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
          </button>
          <button type="button" onClick={() => navigate('/admin/noticias')} className="btn-secondary" style={{ padding: '12px 24px' }}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
