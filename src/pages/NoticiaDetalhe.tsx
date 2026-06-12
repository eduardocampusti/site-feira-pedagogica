import { useParams } from 'react-router-dom'
import { useNoticia } from '../hooks/useNoticias'

export default function NoticiaDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { data: noticia, loading, error } = useNoticia(id)

  if (error) return <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: 'red' }}>⚠️ Notícia não encontrada</div>
  if (loading) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Carregando...</div>
  if (!noticia) return null

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <article className="container" style={{ maxWidth: 800 }}>
        {noticia.imagem_capa && (
          <img src={noticia.imagem_capa} alt={noticia.titulo} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12, marginBottom: 40 }} />
        )}

        <span style={{ display: 'inline-block', background: '#e5a864', color: '#3a1a00', padding: '6px 14px', borderRadius: 9999, fontSize: 11, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase' }}>
          {noticia.categoria}
        </span>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#163526', marginBottom: 16, lineHeight: 1.2 }}>
          {noticia.titulo}
        </h1>

        <p style={{ fontSize: 16, color: '#727973', marginBottom: 40 }}>
          Publicado em {new Date(noticia.data_publicacao).toLocaleDateString('pt-BR')}
        </p>

        <div style={{ borderTop: '1px solid #e6e2d8', paddingTop: 40 }}>
          <div style={{ fontSize: 18, color: '#424843', lineHeight: 1.8, wordBreak: 'break-word' }}>
            {noticia.conteudo?.split('\n').map((para, i) => (
              <p key={i} style={{ marginBottom: 20 }}>{para}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
