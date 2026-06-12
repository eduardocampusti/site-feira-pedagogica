import { useState } from 'react'
import { useGaleria } from '../hooks/useGaleria'
import { useEdicoes } from '../hooks/useEdicoes'

export default function Galeria() {
  const [edicaoSelecionada, setEdicaoSelecionada] = useState<string | undefined>()
  const { data: edicoes } = useEdicoes()
  const { data: fotos, loading } = useGaleria(edicaoSelecionada)
  const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null)

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <div className="container">
        <p className="section-label">MOMENTOS</p>
        <h1 className="section-heading" style={{ marginBottom: 40 }}>Galeria de Fotos</h1>

        <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          <button onClick={() => setEdicaoSelecionada(undefined)} className={!edicaoSelecionada ? "btn-primary" : "btn-secondary"} style={{ fontSize: 13, padding: '8px 16px' }}>Todas</button>
          {edicoes.map(e => (
            <button key={e.id} onClick={() => setEdicaoSelecionada(e.id)} className={edicaoSelecionada === e.id ? "btn-primary" : "btn-secondary"} style={{ fontSize: 13, padding: '8px 16px' }}>
              Ano {e.ano}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {loading ? (
            [1,2,3,4,5,6,7,8].map(i => (
              <div key={i} style={{ height: 200, background: '#e6e2d8', borderRadius: 8, animation: 'pulse 2s infinite' }} />
            ))
          ) : (
            fotos.map(f => (
              <div key={f.id} style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, cursor: 'pointer' }} onClick={() => setFotoSelecionada(f.url)}>
                <img src={f.url} alt={f.titulo} style={{ width: '100%', height: 200, objectFit: 'cover', transition: 'transform 0.3s' }} onMouseEnter={ev => { (ev.target as HTMLImageElement).style.transform = 'scale(1.05)' }} onMouseLeave={ev => { (ev.target as HTMLImageElement).style.transform = '' }} />
                {f.titulo && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', padding: '12px', fontSize: 12 }}>{f.titulo}</div>}
              </div>
            ))
          )}
        </div>
      </div>

      {fotoSelecionada && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={() => setFotoSelecionada(null)}>
          <img src={fotoSelecionada} alt="Foto em destaque" style={{ maxWidth: '90%', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}
    </main>
  )
}
