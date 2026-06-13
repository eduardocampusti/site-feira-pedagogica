import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useEdicao } from '../hooks/useEdicoes'
import { useNoticias } from '../hooks/useNoticias'
import { useGaleria } from '../hooks/useGaleria'
import { supabase } from '../lib/supabase'
import type { Depoimento } from '../types'

export default function EdicaoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { data: edicao, loading, error } = useEdicao(id)
  const { data: noticias } = useNoticias({ edicao_id: id, limit: 6 })
  const { data: fotos } = useGaleria(id)
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([])
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('depoimentos').select('*').eq('edicao_id', id).eq('publicado', true)
      .then(({ data }) => setDepoimentos((data as Depoimento[]) || []))
  }, [id])

  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Edição não encontrada</div>
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Carregando...</div>
  if (!edicao) return null

  return (
    <main style={{ background: '#fdf9ef', paddingBottom: 80 }}>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <img src={lightbox} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 8 }} />
        </div>
      )}

      {/* Hero com foto de capa */}
      <div style={{ background: edicao.foto_capa ? `url(${edicao.foto_capa}) center/cover` : '#163526', minHeight: 420, position: 'relative', marginBottom: 60 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(22,53,38,0.75), rgba(150,71,43,0.55))' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #fdf9ef, transparent)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 80, paddingBottom: 60, color: 'white' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20, fontSize: 13, opacity: 0.75 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Início</Link>
            <span>›</span>
            <Link to="/edicoes" style={{ color: 'white', textDecoration: 'none' }}>Edições</Link>
            <span>›</span>
            <span>Ano {edicao.ano}</span>
          </div>
          <span style={{ display: 'inline-block', background: '#e5a864', color: '#3a1a00', padding: '4px 16px', borderRadius: 9999, fontSize: 11, fontWeight: 700, marginBottom: 16, letterSpacing: '0.08em' }}>ANO {edicao.ano}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 5vw, 54px)', marginBottom: 12, lineHeight: 1.15 }}>{edicao.nome}</h1>
          <p style={{ fontSize: 19, opacity: 0.9 }}>{edicao.tema}</p>
        </div>
      </div>

      <div className="container">

        {/* Conteúdo + data */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, marginBottom: 64, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#163526', marginBottom: 16 }}>Sobre esta edição</h2>
            {edicao.descricao && <p style={{ fontSize: 17, color: '#424843', lineHeight: 1.85, marginBottom: 28 }}>{edicao.descricao}</p>}

            {edicao.objetivos && (
              <>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#163526', marginBottom: 12 }}>🎯 Objetivos Pedagógicos</h3>
                <p style={{ fontSize: 16, color: '#424843', lineHeight: 1.8 }}>{edicao.objetivos}</p>
              </>
            )}
          </div>
          <div>
            <div style={{ background: '#f1eee4', padding: 24, borderRadius: 14, marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: '#727973', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Data do evento</p>
              <p style={{ fontSize: 26, fontFamily: 'var(--font-heading)', color: '#163526', fontWeight: 700 }}>
                {edicao.data ? new Date(edicao.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'A confirmar'}
              </p>
            </div>
            <Link to="/galeria" style={{ display: 'block', background: '#163526', color: 'white', padding: '12px 20px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>
              📸 Ver galeria completa
            </Link>
          </div>
        </div>

        {/* Galeria de fotos */}
        {fotos.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#163526', marginBottom: 24 }}>📷 Galeria de Fotos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {fotos.map(f => (
                <div key={f.id} onClick={() => setLightbox(f.url)} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'zoom-in', aspectRatio: '4/3' }}>
                  <img src={f.url} alt={f.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ''}
                  />
                  {f.titulo && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', fontSize: 12 }}>
                      {f.titulo}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Depoimentos */}
        {depoimentos.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#163526', marginBottom: 24 }}>💬 Depoimentos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {depoimentos.map(d => (
                <div key={d.id} style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e6e2d8', position: 'relative' }}>
                  <div style={{ fontSize: 32, color: '#e5a864', lineHeight: 1, marginBottom: 12 }}>"</div>
                  <p style={{ fontSize: 15, color: '#424843', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>{d.texto}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {d.foto ? (
                      <img src={d.foto} alt={d.nome} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e6e2d8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
                    )}
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: '#163526', margin: 0 }}>{d.nome}</p>
                      <p style={{ fontSize: 12, color: '#727973', margin: 0 }}>{d.papel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Notícias relacionadas */}
        {noticias.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#163526', marginBottom: 24 }}>📰 Notícias relacionadas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {noticias.map(n => (
                <Link key={n.id} to={`/noticias/${n.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6e2d8', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                  >
                    {n.imagem_capa && <img src={n.imagem_capa} alt={n.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />}
                    <div style={{ padding: 16 }}>
                      <span style={{ fontSize: 11, color: '#96472b', fontWeight: 700, textTransform: 'uppercase' }}>{n.categoria}</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#163526', margin: '8px 0' }}>{n.titulo}</h3>
                      <p style={{ fontSize: 13, color: '#424843' }}>{n.resumo?.substring(0, 80)}...</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link to="/edicoes" className="btn-secondary" style={{ fontSize: 14 }}>← Ver todas as edições</Link>
      </div>
    </main>
  )
}
