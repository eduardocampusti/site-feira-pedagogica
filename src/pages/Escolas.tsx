import { useEscolas } from '../hooks/useEscolas'

export default function Escolas() {
  const { data, loading } = useEscolas()

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <div className="container">
        <p className="section-label">PARCEIRAS</p>
        <h1 className="section-heading" style={{ marginBottom: 40 }}>Escolas Participantes</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {loading ? (
            [1,2,3,4,5,6].map(i => (
              <div key={i} style={{ height: 320, background: '#e6e2d8', borderRadius: 12, animation: 'pulse 2s infinite' }} />
            ))
          ) : (
            data.map(e => (
              <div key={e.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6e2d8' }}>
                {e.foto && <img src={e.foto} alt={e.nome} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#163526', marginBottom: 8 }}>{e.nome}</h3>
                  <p style={{ fontSize: 14, color: '#727973', marginBottom: 16 }}>📍 {e.localidade}</p>
                  <div style={{ fontSize: 13, color: '#424843', lineHeight: 1.8 }}>
                    <p><strong>Professores:</strong> {e.professores}</p>
                    <p><strong>Turmas:</strong> {e.turmas}</p>
                  </div>
                  {e.descricao_participacao && (
                    <p style={{ fontSize: 13, color: '#727973', marginTop: 12, borderTop: '1px solid #e6e2d8', paddingTop: 12 }}>
                      {e.descricao_participacao}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
