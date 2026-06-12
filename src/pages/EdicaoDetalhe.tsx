import { useParams } from 'react-router-dom'
import { useEdicao } from '../hooks/useEdicoes'
import { useNoticias } from '../hooks/useNoticias'
import { useGaleria } from '../hooks/useGaleria'

export default function EdicaoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { data: edicao, loading, error } = useEdicao(id)
  const { data: noticias } = useNoticias({ edicao_id: id, limit: 5 })
  const { data: fotos } = useGaleria(id)

  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Edição não encontrada</div>
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Carregando...</div>
  if (!edicao) return null

  return (
    <main style={{ background: '#fdf9ef', paddingBottom: 80 }}>
      <div style={{ background: `url(${edicao.foto_capa}) center/cover`, minHeight: 400, position: 'relative', marginBottom: 60 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(22,53,38,0.7), rgba(150,71,43,0.5))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16 }}>ANO {edicao.ano}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 16 }}>{edicao.nome}</h1>
          <p style={{ fontSize: 20, opacity: 0.9 }}>{edicao.tema}</p>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, marginBottom: 60 }}>
          <div>
            <h2 className="section-heading">Sobre esta edição</h2>
            <p style={{ fontSize: 18, color: '#424843', lineHeight: 1.8, marginBottom: 24 }}>{edicao.descricao}</p>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#163526', marginBottom: 12 }}>Objetivos Pedagógicos</h3>
            <p style={{ fontSize: 16, color: '#424843', lineHeight: 1.8 }}>{edicao.objetivos}</p>
          </div>
          <div style={{ background: '#f1eee4', padding: 24, borderRadius: 12 }}>
            <p style={{ fontSize: 12, color: '#727973', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 12 }}>Data do evento</p>
            <p style={{ fontSize: 28, fontFamily: 'var(--font-heading)', color: '#163526', fontWeight: 700 }}>{edicao.data ? new Date(edicao.data).toLocaleDateString('pt-BR') : 'Data não informada'}</p>
          </div>
        </div>

        {fotos.length > 0 && (
          <>
            <h2 className="section-heading" style={{ marginTop: 60, marginBottom: 20 }}>Galeria de Fotos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 60 }}>
              {fotos.slice(0, 6).map(f => (
                <img key={f.id} src={f.url} alt={f.titulo} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12 }} />
              ))}
            </div>
          </>
        )}

        {noticias.length > 0 && (
          <>
            <h2 className="section-heading" style={{ marginBottom: 20 }}>Notícias relacionadas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {noticias.map(n => (
                <div key={n.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6e2d8' }}>
                  {n.imagem_capa && <img src={n.imagem_capa} alt={n.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />}
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#163526' }}>{n.titulo}</h3>
                    <p style={{ fontSize: 14, color: '#424843', margin: '8px 0' }}>{n.resumo}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
