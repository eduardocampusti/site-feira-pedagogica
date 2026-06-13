import { Link } from 'react-router-dom'
import { useEscolas } from '../hooks/useEscolas'

export default function Escolas() {
  const { data, loading } = useEscolas()

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <div className="container">
        <p className="section-label">PARCEIRAS</p>
        <h1 className="section-heading" style={{ marginBottom: 12 }}>Escolas Participantes</h1>
        <p style={{ fontSize: 17, color: '#424843', marginBottom: 48, maxWidth: 600 }}>
          Conheça as escolas que fazem parte da Feira Pedagógica da Região Serrana.
        </p>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ height: 340, background: '#e6e2d8', borderRadius: 16, animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#727973' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏫</div>
            <p>Nenhuma escola cadastrada ainda.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {data.map(e => (
              <div key={e.id} style={{
                background: 'white', borderRadius: 16, overflow: 'hidden',
                border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column',
                transition: 'all 0.25s',
              }}
                onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; (ev.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(22,53,38,0.12)' }}
                onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.transform = ''; (ev.currentTarget as HTMLElement).style.boxShadow = '' }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={e.foto || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=220&fit=crop'}
                    alt={e.nome}
                    style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,53,38,0.4), transparent)' }} />
                  <span style={{ position: 'absolute', bottom: 12, left: 12, fontSize: 12, color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    📍 {e.localidade}
                  </span>
                </div>
                <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, color: '#163526', marginBottom: 12, lineHeight: 1.3 }}>{e.nome}</h3>
                  {e.professores && (
                    <p style={{ fontSize: 13, color: '#424843', marginBottom: 6 }}>
                      <strong>Professores:</strong> {e.professores}
                    </p>
                  )}
                  {e.turmas && (
                    <p style={{ fontSize: 13, color: '#424843', marginBottom: 12 }}>
                      <strong>Turmas:</strong> {e.turmas}
                    </p>
                  )}
                  {e.descricao_participacao && (
                    <p style={{ fontSize: 13, color: '#727973', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                      {e.descricao_participacao.substring(0, 100)}
                      {e.descricao_participacao.length > 100 ? '...' : ''}
                    </p>
                  )}
                  <Link to={`/escolas/${e.id}`} className="btn-secondary" style={{ fontSize: 13, textAlign: 'center', marginTop: 'auto' }}>
                    Ver detalhes →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
