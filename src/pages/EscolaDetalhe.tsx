import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Escola } from '../types'

export default function EscolaDetalhe() {
  const { id } = useParams<{ id: string }>()
  const [escola, setEscola] = useState<Escola | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase.from('escolas').select('*').eq('id', id).single()
      .then(({ data }) => { setEscola(data as Escola); setLoading(false) })
  }, [id])

  if (loading) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Carregando...</div>
  if (!escola) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Escola não encontrada.</div>

  return (
    <main style={{ background: '#fdf9ef', padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 900 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 13, color: '#727973' }}>
          <Link to="/" style={{ color: '#727973', textDecoration: 'none' }}>Início</Link>
          <span>›</span>
          <Link to="/escolas" style={{ color: '#727973', textDecoration: 'none' }}>Escolas</Link>
          <span>›</span>
          <span style={{ color: '#1c1c16' }}>{escola.nome}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: escola.foto ? '1fr 320px' : '1fr', gap: 40, marginBottom: 48, alignItems: 'start' }}>
          <div>
            <p className="section-label">Escola Parceira</p>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', color: '#163526', marginBottom: 12, lineHeight: 1.2 }}>
              {escola.nome}
            </h1>
            <p style={{ fontSize: 16, color: '#727973', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
              📍 {escola.localidade}
            </p>
            {escola.descricao_participacao && (
              <p style={{ fontSize: 17, color: '#424843', lineHeight: 1.8 }}>{escola.descricao_participacao}</p>
            )}
          </div>
          {escola.foto && (
            <img src={escola.foto} alt={escola.nome} style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 16 }} />
          )}
        </div>

        {/* Detalhes em cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          {escola.professores && (
            <div style={{ background: 'white', padding: 24, borderRadius: 14, border: '1px solid #e6e2d8' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#163526', marginBottom: 12 }}>👩‍🏫 Professores Responsáveis</h3>
              <p style={{ fontSize: 15, color: '#424843', lineHeight: 1.7 }}>{escola.professores}</p>
            </div>
          )}
          {escola.turmas && (
            <div style={{ background: 'white', padding: 24, borderRadius: 14, border: '1px solid #e6e2d8' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#163526', marginBottom: 12 }}>📚 Turmas Participantes</h3>
              <p style={{ fontSize: 15, color: '#424843', lineHeight: 1.7 }}>{escola.turmas}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32 }}>
          <Link to="/escolas" className="btn-secondary" style={{ fontSize: 14 }}>← Voltar para Escolas</Link>
        </div>
      </div>
    </main>
  )
}
