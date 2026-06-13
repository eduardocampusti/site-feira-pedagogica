import { useParams, Link } from 'react-router-dom'
import { useNoticia } from '../hooks/useNoticias'

export default function NoticiaDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { data: noticia, loading, error } = useNoticia(id)

  if (error) return <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: 'red' }}>⚠️ Notícia não encontrada</div>
  if (loading) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Carregando...</div>
  if (!noticia) return null

  // Renderiza parágrafos separando linhas em branco
  const paragrafos = noticia.conteudo
    ?.split(/\n\n+/)
    .map(b => b.trim())
    .filter(Boolean) ?? []

  return (
    <main style={{ background: '#fdf9ef', padding: '60px 0 80px' }}>
      <article className="container" style={{ maxWidth: 820 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 28, fontSize: 13, color: '#727973' }}>
          <Link to="/" style={{ color: '#727973', textDecoration: 'none' }}>Início</Link>
          <span>›</span>
          <Link to="/noticias" style={{ color: '#727973', textDecoration: 'none' }}>Notícias</Link>
          <span>›</span>
          <span style={{ color: '#1c1c16' }}>{noticia.titulo.substring(0, 40)}...</span>
        </div>

        {/* Categoria */}
        <span style={{ display: 'inline-block', background: '#e5a864', color: '#3a1a00', padding: '5px 14px', borderRadius: 9999, fontSize: 11, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {noticia.categoria}
        </span>

        {/* Título */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: '#163526', marginBottom: 16, lineHeight: 1.15 }}>
          {noticia.titulo}
        </h1>

        {/* Resumo */}
        {noticia.resumo && (
          <p style={{ fontSize: 20, color: '#424843', lineHeight: 1.6, marginBottom: 20, fontStyle: 'italic', borderLeft: '3px solid #e5a864', paddingLeft: 20 }}>
            {noticia.resumo}
          </p>
        )}

        {/* Data */}
        <p style={{ fontSize: 13, color: '#727973', marginBottom: 32 }}>
          📅 Publicado em {new Date(noticia.data_publicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>

        {/* Imagem de capa */}
        {noticia.imagem_capa && (
          <img src={noticia.imagem_capa} alt={noticia.titulo} style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 14, marginBottom: 48 }} />
        )}

        {/* Conteúdo com formatação de parágrafos */}
        <div style={{ borderTop: '1px solid #e6e2d8', paddingTop: 40 }}>
          {paragrafos.length > 0 ? paragrafos.map((para, i) => (
            <p key={i} style={{ fontSize: 18, color: '#1c1c16', lineHeight: 1.85, marginBottom: 24, wordBreak: 'break-word' }}>
              {para.split('\n').map((line, j) => (
                <span key={j}>{line}{j < para.split('\n').length - 1 && <br />}</span>
              ))}
            </p>
          )) : (
            <p style={{ fontSize: 16, color: '#727973' }}>Sem conteúdo disponível.</p>
          )}
        </div>

        {/* Botão voltar */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #e6e2d8' }}>
          <Link to="/noticias" className="btn-secondary" style={{ fontSize: 14 }}>
            ← Voltar para Notícias
          </Link>
        </div>
      </article>
    </main>
  )
}
