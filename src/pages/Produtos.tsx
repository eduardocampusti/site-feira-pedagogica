import { useState } from 'react'
import { useProdutos } from '../hooks/useProdutos'

export default function Produtos() {
  const [categoria, setCategoria] = useState<string | undefined>()
  const { data, loading } = useProdutos({ categoria, limit: 50 })
  const categorias = Array.from(new Set(data.map(p => p.categoria).filter(Boolean)))

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <div className="container">
        <p className="section-label">AGRICULTURA FAMILIAR</p>
        <h1 className="section-heading" style={{ marginBottom: 40 }}>Produtos Locais</h1>

        {categorias.length > 0 && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            <button onClick={() => setCategoria(undefined)} className={!categoria ? "btn-primary" : "btn-secondary"} style={{ fontSize: 13, padding: '8px 16px' }}>Todos</button>
            {categorias.map(c => (
              <button key={c} onClick={() => setCategoria(c)} className={categoria === c ? "btn-primary" : "btn-secondary"} style={{ fontSize: 13, padding: '8px 16px' }}>
                {c}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {loading ? (
            [1,2,3,4,5,6].map(i => (
              <div key={i} style={{ height: 300, background: '#e6e2d8', borderRadius: 12, animation: 'pulse 2s infinite' }} />
            ))
          ) : (
            data.map(p => (
              <div key={p.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6e2d8', padding: 16 }}>
                <img src={p.imagem || 'https://images.unsplash.com/photo-1488459716781-6f3ee1626495?w=300&h=200&fit=crop'} alt={p.nome} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
                <span style={{ fontSize: 11, color: '#96472b', fontWeight: 700, textTransform: 'uppercase' }}>{p.categoria}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#163526', margin: '8px 0' }}>{p.nome}</h3>
                <p style={{ fontSize: 13, color: '#424843', marginBottom: 8 }}>{p.descricao?.substring(0, 60)}...</p>
                <p style={{ fontSize: 12, color: '#727973' }}>👥 {p.escola} | 📚 {p.turma}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
