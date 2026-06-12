import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminEscolaForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', localidade: '', foto: '', professores: '', turmas: '', descricao_participacao: '', publicado: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) carregarEscola()
  }, [id])

  async function carregarEscola() {
    const { data } = await supabase.from('escolas').select('*').eq('id', id).single()
    if (data) setForm(data as any)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (id) {
      await supabase.from('escolas').update(form).eq('id', id)
    } else {
      await supabase.from('escolas').insert([form])
    }
    setLoading(false)
    navigate('/admin/escolas')
  }

  return (
    <div style={{ flex: 1, padding: 40, maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>{id ? 'Editar' : 'Nova'} Escola</h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Nome da Escola</label>
          <input type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Localidade</label>
            <input type="text" value={form.localidade} onChange={e => setForm({...form, localidade: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>URL Foto</label>
            <input type="url" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Professores</label>
            <input type="text" value={form.professores} onChange={e => setForm({...form, professores: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Turmas</label>
            <input type="text" value={form.turmas} onChange={e => setForm({...form, turmas: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Descrição da Participação</label>
          <textarea value={form.descricao_participacao} onChange={e => setForm({...form, descricao_participacao: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 100 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="checkbox" checked={form.publicado} onChange={e => setForm({...form, publicado: e.target.checked})} style={{ width: 18, height: 18 }} />
          <label style={{ fontSize: 14, fontWeight: 500 }}>Publicar</label>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 24px' }}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => navigate('/admin/escolas')} className="btn-secondary" style={{ padding: '12px 24px' }}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
