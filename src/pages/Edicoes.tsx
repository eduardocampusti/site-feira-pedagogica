import { Link } from 'react-router-dom'
import { useEdicoes } from '../hooks/useEdicoes'
import { useWindowSize } from '../hooks/useWindowSize'

export default function Edicoes() {
  const { data, loading, error } = useEdicoes()
  const { isMobile } = useWindowSize()

  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>⚠️ {error}</div>

  return (
    <main style={{ background: '#fdf9ef', padding: isMobile ? '60px 20px' : '80px 0' }}>
      <div className="container">
        <p className="section-label">HISTÓRICO</p>
        <h1 className="section-heading" style={{ marginBottom: 40 }}>As Edições da Feira</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 24,
          marginBottom: 60
        }}>
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} style={{ height: 320, background: '#e6e2d8', borderRadius: 16, animation: 'pulse 2s infinite' }} />
            ))
          ) : (
            data.map(e => (
              <Link key={e.id} to={`/edicoes/${e.id}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{
                  background: 'white',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid #e6e2d8',
                  transition: 'all 0.3s',
                  transform: 'translateY(0)',
                }} onMouseEnter={ev => { (ev.currentTarget as any).style.transform = 'translateY(-6px)'; (ev.currentTarget as any).style.boxShadow = '0 12px 32px rgba(22,53,38,0.12)' }}
                   onMouseLeave={ev => { (ev.currentTarget as any).style.transform = ''; (ev.currentTarget as any).style.boxShadow = '' }}>
                  <img src={e.foto_capa || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'} alt={e.nome} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
                  <div style={{ padding: 20 }}>
                    <span style={{ display: 'inline-block', background: '#e5a864', color: '#3a1a00', padding: '4px 12px', borderRadius: 9999, fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
                      ANO {e.ano}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#163526', marginBottom: 4 }}>{e.nome}</h3>
                    <p style={{ fontSize: 13, color: '#727973', marginBottom: 12 }}>{e.tema}</p>
                    <p style={{ fontSize: 14, color: '#424843', lineHeight: 1.6 }}>{e.descricao?.substring(0, 80)}...</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
