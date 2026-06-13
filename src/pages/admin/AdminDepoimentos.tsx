import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Depoimento, Edicao } from '../../types'

const papeis = ['Aluno', 'Professor', 'Agricultor', 'Família', 'Comunidade', 'Coordenador']

export default function AdminDepoimentos() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([])
  const [edicoes, setEdicoes] = useState<Edicao[]>([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState<Depoimento | null>(null)
  const [form, setForm] = useState({ nome: '', papel: 'Aluno', texto: '', foto: '', edicao_id: '', publicado: true })

  useEffect(() => { carregar() }, [])

  async function carregar() {
    const [{ data: d }, { data: e }] = await Promise.all([
      supabase.from('depoimentos').select('*').order('created_at', { ascending: false }),
      supabase.from('edicoes').select('id, ano, nome'),
    ])
    setDepoimentos((d as Depoimento[]) || [])
    setEdicoes((e as Edicao[]) || [])
    setLoading(false)
  }

  async function salvar(ev: React.FormEvent) {
    ev.preventDefault()
    const payload = { ...form, edicao_id: form.edicao_id || null }
    if (editando) {
      await supabase.from('depoimentos').update(payload).eq('id', editando.id)
    } else {
      await supabase.from('depoimentos').insert([payload])
    }
    setForm({ nome: '', papel: 'Aluno', texto: '', foto: '', edicao_id: '', publicado: true })
    setEditando(null)
    carregar()
  }

  async function deletar(id: string) {
    if (!confirm('Deletar este depoimento?')) return
    await supabase.from('depoimentos').delete().eq('id', id)
    carregar()
  }

  async function togglePublicado(id: string, pub: boolean) {
    await supabase.from('depoimentos').update({ publicado: !pub }).eq('id', id)
    carregar()
  }

  function iniciarEdicao(d: Depoimento) {
    setEditando(d)
    setForm({ nome: d.nome, papel: d.papel, texto: d.texto, foto: d.foto || '', edicao_id: d.edicao_id || '', publicado: d.publicado })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inp = { width: '100%', padding: '10px 14px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 14 } as React.CSSProperties

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>Depoimentos</h1>

      {/* Formulário */}
      <div style={{ background: 'white', padding: 28, borderRadius: 12, border: '1px solid #e6e2d8', marginBottom: 36 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#163526', marginBottom: 20 }}>
          {editando ? '✏️ Editar Depoimento' : '➕ Novo Depoimento'}
        </h2>
        <form onSubmit={salvar} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Nome</label>
              <input style={inp} value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Papel</label>
              <select style={inp} value={form.papel} onChange={e => setForm({ ...form, papel: e.target.value })}>
                {papeis.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Edição</label>
              <select style={inp} value={form.edicao_id} onChange={e => setForm({ ...form, edicao_id: e.target.value })}>
                <option value="">Sem edição</option>
                {edicoes.map(e => <option key={e.id} value={e.id}>Ano {e.ano} — {e.nome}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Depoimento</label>
            <textarea style={{ ...inp, minHeight: 100 }} value={form.texto} onChange={e => setForm({ ...form, texto: e.target.value })} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>URL da Foto (opcional)</label>
              <input type="url" style={inp} placeholder="https://..." value={form.foto} onChange={e => setForm({ ...form, foto: e.target.value })} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', paddingBottom: 10 }}>
              <input type="checkbox" checked={form.publicado} onChange={e => setForm({ ...form, publicado: e.target.checked })} style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 14 }}>Publicar</span>
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
              {editando ? '💾 Salvar' : '➕ Adicionar'}
            </button>
            {editando && (
              <button type="button" className="btn-secondary" style={{ padding: '10px 24px' }}
                onClick={() => { setEditando(null); setForm({ nome: '', papel: 'Aluno', texto: '', foto: '', edicao_id: '', publicado: true }) }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista */}
      {loading ? <p>Carregando...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {depoimentos.length === 0 && <p style={{ textAlign: 'center', color: '#727973', padding: 40 }}>Nenhum depoimento cadastrado ainda.</p>}
          {depoimentos.map(d => (
            <div key={d.id} style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              {d.foto ? (
                <img src={d.foto} alt={d.nome} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#e6e2d8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👤</div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 15 }}>{d.nome}</strong>
                  <span style={{ fontSize: 11, background: '#e5a864', color: '#3a1a00', padding: '2px 8px', borderRadius: 9999, fontWeight: 700 }}>{d.papel}</span>
                  <span style={{ fontSize: 11, background: d.publicado ? '#c7ebd4' : '#ffdad6', color: d.publicado ? '#012113' : '#93000a', padding: '2px 8px', borderRadius: 9999, fontWeight: 600 }}>
                    {d.publicado ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#424843', margin: '0 0 0 0' }}>"{d.texto}"</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => iniciarEdicao(d)} style={{ padding: '6px 12px', background: '#163526', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>✏️</button>
                <button onClick={() => togglePublicado(d.id, d.publicado)} style={{ padding: '6px 12px', background: '#96472b', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                  {d.publicado ? '🔒' : '🔓'}
                </button>
                <button onClick={() => deletar(d.id)} style={{ padding: '6px 12px', background: '#ba1a1a', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
