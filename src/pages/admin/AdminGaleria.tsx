import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { FotoGaleria, Edicao } from '../../types'

export default function AdminGaleria() {
  const [fotos, setFotos] = useState<FotoGaleria[]>([])
  const [edicoes, setEdicoes] = useState<Edicao[]>([])
  const [form, setForm] = useState({ url: '', titulo: '', legenda: '', edicao_id: '', categoria: '', destaque: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregarFotos()
    carregarEdicoes()
  }, [])

  async function carregarFotos() {
    const { data } = await supabase.from('galeria').select('*').order('created_at', { ascending: false })
    setFotos((data as FotoGaleria[]) || [])
  }

  async function carregarEdicoes() {
    const { data } = await supabase.from('edicoes').select('*')
    setEdicoes((data as Edicao[]) || [])
  }

  async function handleAddFoto(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, edicao_id: form.edicao_id || null }
    await supabase.from('galeria').insert([payload])
    setLoading(false)
    carregarFotos()
    setForm({ url: '', titulo: '', legenda: '', edicao_id: '', categoria: '', destaque: false })
  }

  async function deletar(id: string) {
    if (!confirm('Deletar?')) return
    await supabase.from('galeria').delete().eq('id', id)
    carregarFotos()
  }

  async function toggleDestaque(id: string, destaque: boolean) {
    await supabase.from('galeria').update({ destaque: !destaque }).eq('id', id)
    carregarFotos()
  }

  return (
    <div style={{ flex: 1, padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>Galeria de Fotos</h1>

      {/* Formulário para adicionar */}
      <div style={{ background: 'white', padding: 24, borderRadius: 12, border: '1px solid #e6e2d8', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#163526', marginBottom: 16 }}>Adicionar Foto</h2>
        <form onSubmit={handleAddFoto} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <input type="url" value={form.url} onChange={e => setForm({...form, url: e.target.value})} placeholder="URL da foto" required style={{ padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }} />
          <input type="text" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} placeholder="Título" style={{ padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }} />
          <input type="text" value={form.legenda} onChange={e => setForm({...form, legenda: e.target.value})} placeholder="Legenda" style={{ padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }} />
          <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} style={{ padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }}>
            <option value="">Sem categoria</option>
            <option value="eventos">Eventos</option>
            <option value="aulas">Aulas</option>
            <option value="produções">Produções</option>
          </select>
          <select value={form.edicao_id} onChange={e => setForm({...form, edicao_id: e.target.value})} style={{ padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }}>
            <option value="">Sem edição</option>
            {edicoes.map(e => (
              <option key={e.id} value={e.id}>Ano {e.ano}</option>
            ))}
          </select>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '10px 12px' }}>{loading ? 'Enviando...' : '➕ Adicionar'}</button>
        </form>
      </div>

      {/* Grid de fotos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {fotos.map(f => (
          <div key={f.id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6e2d8' }}>
            <img src={f.url} alt={f.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 8 }}>
              <button onClick={() => toggleDestaque(f.id, f.destaque)} style={{ padding: '6px 10px', background: f.destaque ? '#e5a864' : '#c0c0c0', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>⭐</button>
              <button onClick={() => deletar(f.id)} style={{ padding: '6px 10px', background: '#ba1a1a', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>🗑️</button>
            </div>
            {f.titulo && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', padding: '8px', fontSize: 12 }}>{f.titulo}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
