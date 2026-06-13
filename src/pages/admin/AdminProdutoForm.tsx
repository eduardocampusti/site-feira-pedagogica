import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Edicao, Escola } from '../../types'

const categoriasProduto = ['Alimentos', 'Hortaliças', 'Doces', 'Artesanato', 'Plantas', 'Sementes', 'Produtos Naturais', 'Bebidas', 'Outros']

export default function AdminProdutoForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [edicoes, setEdicoes] = useState<Edicao[]>([])
  const [escolas, setEscolas] = useState<Escola[]>([])
  const [form, setForm] = useState({ nome: '', descricao: '', imagem: '', categoria: '', escola: '', turma: '', conteudo_pedagogico: '', edicao_id: '', publicado: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      supabase.from('edicoes').select('id, ano, nome').order('ano'),
      supabase.from('escolas').select('id, nome').order('nome'),
    ]).then(([{ data: ed }, { data: esc }]) => {
      setEdicoes((ed as Edicao[]) || [])
      setEscolas((esc as Escola[]) || [])
    })
    if (id) {
      supabase.from('produtos').select('*').eq('id', id).single()
        .then(({ data }) => { if (data) setForm(data as any) })
    }
  }, [id])

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

  const inp = { width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 15 } as React.CSSProperties
  const lbl = { display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' } as React.CSSProperties

  return (
    <div style={{ padding: 40, maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>
        {id ? 'Editar' : 'Novo'} Produto
      </h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div>
          <label style={lbl}>Nome do Produto *</label>
          <input type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required style={inp} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={lbl}>Categoria</label>
            <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} style={inp}>
              <option value="">Selecione...</option>
              {categoriasProduto.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Edição</label>
            <select value={form.edicao_id} onChange={e => setForm({...form, edicao_id: e.target.value})} style={inp}>
              <option value="">Sem edição</option>
              {edicoes.map(e => <option key={e.id} value={e.id}>Ano {e.ano} — {e.nome}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={lbl}>Escola Responsável</label>
            <select value={form.escola} onChange={e => setForm({...form, escola: e.target.value})} style={inp}>
              <option value="">Selecione a escola...</option>
              {escolas.map(esc => <option key={esc.id} value={esc.nome}>{esc.nome}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Turma</label>
            <input type="text" value={form.turma} onChange={e => setForm({...form, turma: e.target.value})} placeholder="ex: 5º Ano A" style={inp} />
          </div>
        </div>

        <div>
          <label style={lbl}>URL da Imagem</label>
          <input type="url" value={form.imagem} onChange={e => setForm({...form, imagem: e.target.value})} placeholder="https://..." style={inp} />
          {form.imagem && (
            <img src={form.imagem} alt="Preview" style={{ marginTop: 8, width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }} />
          )}
        </div>

        <div>
          <label style={lbl}>Descrição</label>
          <textarea value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} style={{ ...inp, minHeight: 80 }} />
        </div>

        <div>
          <label style={lbl}>Conteúdo Pedagógico</label>
          <textarea value={form.conteudo_pedagogico} onChange={e => setForm({...form, conteudo_pedagogico: e.target.value})} placeholder="Qual matéria ou conteúdo este produto representa?" style={{ ...inp, minHeight: 80 }} />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.publicado} onChange={e => setForm({...form, publicado: e.target.checked})} style={{ width: 18, height: 18 }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Publicar no site</span>
        </label>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 28px' }}>
            {loading ? 'Salvando...' : id ? '💾 Atualizar' : '✅ Criar Produto'}
          </button>
          <button type="button" onClick={() => navigate('/admin/produtos')} className="btn-secondary" style={{ padding: '12px 24px' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
