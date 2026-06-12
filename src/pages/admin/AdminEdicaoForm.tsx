import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminEdicaoForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState({ ano: new Date().getFullYear(), nome: '', tema: '', data: '', descricao: '', objetivos: '', foto_capa: '', publicado: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) carregarEdicao()
  }, [id])

  async function carregarEdicao() {
    const { data } = await supabase.from('edicoes').select('*').eq('id', id).single()
    if (data) setForm(data as any)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (id) {
      await supabase.from('edicoes').update(form).eq('id', id)
    } else {
      await supabase.from('edicoes').insert([form])
    }
    setLoading(false)
    navigate('/admin/edicoes')
  }

  return (
    <div style={{ flex: 1, padding: 40, maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>{id ? 'Editar' : 'Nova'} Edição</h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Ano</label>
            <input type="number" value={form.ano} onChange={e => setForm({...form, ano: parseInt(e.target.value)})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Data do Evento</label>
            <input type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Nome da Edição</label>
          <input type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Tema Pedagógico</label>
          <input type="text" value={form.tema} onChange={e => setForm({...form, tema: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Descrição</label>
          <textarea value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 100 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Objetivos Pedagógicos</label>
          <textarea value={form.objetivos} onChange={e => setForm({...form, objetivos: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 100 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>URL Foto Capa</label>
          <input type="url" value={form.foto_capa} onChange={e => setForm({...form, foto_capa: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="checkbox" checked={form.publicado} onChange={e => setForm({...form, publicado: e.target.checked})} style={{ width: 18, height: 18 }} />
          <label style={{ fontSize: 14, fontWeight: 500 }}>Publicar</label>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 24px' }}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => navigate('/admin/edicoes')} className="btn-secondary" style={{ padding: '12px 24px' }}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
