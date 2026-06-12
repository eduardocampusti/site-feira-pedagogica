import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNoticias } from '../hooks/useNoticias'

const categorias = ['educacao', 'agricultura', 'cultura', 'sustentabilidade', 'empreendedorismo', 'galeria', 'eventos']

export default function Noticias() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | undefined>()
  const { data, loading } = useNoticias({ categoria: categoriaSelecionada, limit: 50 })

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <div className="container">
        <p className="section-label">NOTÍCIAS</p>
        <h1 className="section-heading" style={{ marginBottom: 40 }}>Novidades da Feira</h1>

        <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          <button onClick={() => setCategoriaSelecionada(undefined)} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
            Todas
          </button>
          {categorias.map(c => (
            <button key={c} onClick={() => setCategoriaSelecionada(c)} className={categoriaSelecionada === c ? "btn-primary" : "btn-secondary"} style={{ padding: '8px 16px', fontSize: 13 }}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {loading ? (
            [1,2,3,4,5,6].map(i => (
              <div key={i} style={{ height: 400, background: '#e6e2d8', borderRadius: 12, animation: 'pulse 2s infinite' }} />
            ))
          ) : data.length > 0 ? (
            data.map(n => (
              <Link key={n.id} to={`/noticias/${n.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6e2d8', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}
                  onMouseEnter={ev => { (ev.currentTarget as any).style.transform = 'translateY(-4px)'; (ev.currentTarget as any).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)' }}
                  onMouseLeave={ev => { (ev.currentTarget as any).style.transform = ''; (ev.currentTarget as any).style.boxShadow = '' }}>
                  {n.imagem_capa && <img src={n.imagem_capa} alt={n.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />}
                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 11, color: '#96472b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>{n.categoria}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#163526', marginBottom: 8, flex: 1 }}>{n.titulo}</h3>
                    <p style={{ fontSize: 13, color: '#727973', marginBottom: 12 }}>{n.resumo?.substring(0, 80)}...</p>
                    <p style={{ fontSize: 12, color: '#c0c0c0' }}>{new Date(n.data_publicacao).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#727973', padding: 40 }}>Nenhuma notícia nesta categoria</p>
          )}
        </div>
      </div>
    </main>
  )
}
