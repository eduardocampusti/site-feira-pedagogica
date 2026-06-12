import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Edicao } from '../../types'

export default function AdminProdutoForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [edicoes, setEdicoes] = useState<Edicao[]>([])
  const [form, setForm] = useState({ nome: '', descricao: '', imagem: '', categoria: '', escola: '', turma: '', conteudo_pedagogico: '', edicao_id: '', publicado: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregarEdicoes()
    if (id) carregarProduto()
  }, [id])

  async function carregarEdicoes() {
    const { data } = await supabase.from('edicoes').select('*')
    setEdicoes((data as Edicao[]) || [])
  }

  async function carregarProduto() {
    const { data } = await supabase.from('produtos').select('*').eq('id', id).single()
    if (data) setForm(data as any)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, edicao_id: form.edicao_id || null }
    if (id) {
      await supabase.from('produtos').update(payload).eq('id', id)
    } else {
      await supabase.from('produtos').insert([payload])
    }
    setLoading(false)
    navigate('/admin/produtos')
  }

  return (
    <div style={{ flex: 1, padding: 40, maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>{id ? 'Editar' : 'Novo'} Produto</h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Nome do Produto</label>
          <input type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Categoria</label>
            <input type="text" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} placeholder="ex: alimentos, plantas" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>URL Imagem</label>
            <input type="url" value={form.imagem} onChange={e => setForm({...form, imagem: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Escola</label>
            <input type="text" value={form.escola} onChange={e => setForm({...form, escola: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Turma</label>
            <input type="text" value={form.turma} onChange={e => setForm({...form, turma: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Descrição</label>
          <textarea value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 80 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Conteúdo Pedagógico</label>
          <textarea value={form.conteudo_pedagogico} onChange={e => setForm({...form, conteudo_pedagogico: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 80 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Edição</label>
          <select value={form.edicao_id} onChange={e => setForm({...form, edicao_id: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }}>
            <option value="">Sem edição</option>
            {edicoes.map(e => (
              <option key={e.id} value={e.id}>Ano {e.ano}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="checkbox" checked={form.publicado} onChange={e => setForm({...form, publicado: e.target.checked})} style={{ width: 18, height: 18 }} />
          <label style={{ fontSize: 14, fontWeight: 500 }}>Publicar</label>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 24px' }}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => navigate('/admin/produtos')} className="btn-secondary" style={{ padding: '12px 24px' }}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
