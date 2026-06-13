import { Link } from 'react-router-dom'
import { useConfigSite } from '../hooks/useConfigSite'

export default function Home() {
  const { config } = useConfigSite()
  const heroImage = config?.imagem_hero || '/hero-banner.png'

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section" aria-label="Apresentação do projeto">
        {/* Imagem de fundo */}
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            zIndex: 0,
          }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
          zIndex: 1,
        }} />
        {/* Fade base */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 'clamp(80px, 15vw, 180px)',
          background: 'linear-gradient(to top, #fdf9ef, transparent)',
          zIndex: 2,
        }} />

        {/* Conteúdo */}
        <div className="hero-content">
          <span aria-label="Edição 2024" style={{
            display: 'inline-block',
            background: '#e5a864', color: '#3a1a00',
            padding: '6px 20px', borderRadius: 9999,
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            ✦ EDIÇÃO 2024 ✦
          </span>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(30px, 6vw, 60px)',
            fontWeight: 700, lineHeight: 1.1,
            marginBottom: 16,
            color: 'white',
            textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.4)',
          }}>
            Feira Pedagógica<br />da Região Serrana
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2.5vw, 19px)',
            lineHeight: 1.7, marginBottom: 32,
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}>
            Educação, agricultura familiar e comunidade<br aria-hidden="true" />
            transformando saberes em experiências.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/sobre" className="btn-primary" style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              padding: 'clamp(12px, 2vw, 14px) clamp(20px, 3vw, 28px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              Conheça o Projeto
            </Link>
            <Link to="/noticias" style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              padding: 'clamp(11px, 2vw, 13px) clamp(18px, 3vw, 26px)',
              border: '2px solid rgba(255,255,255,0.85)',
              borderRadius: 8, color: 'white',
              textDecoration: 'none', fontWeight: 600,
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.12)',
              display: 'inline-flex', alignItems: 'center',
              minHeight: 44,
            }}>
              Ver Notícias
            </Link>
          </div>
        </div>
      </section>

      {/* ── O QUE É A FEIRA ──────────────────────────────── */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', background: '#fdf9ef' }}>
        <div className="container">
          <div className="grid-2col">
            <div>
              <p className="section-label">Nossa Essência</p>
              <h2 className="section-heading">O que é a<br />Feira Pedagógica?</h2>
              <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: '#1c1c16', lineHeight: 1.8, marginBottom: 16 }}>
                A Feira Pedagógica da Região Serrana é um espaço vibrante de diálogo entre educação
                formal e educação comunitária. Alunos, professores, produtores familiares e a comunidade
                local colaboram para cultivar não apenas alimentos, mas conhecimento e sustentabilidade.
              </p>
              <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', color: '#424843', lineHeight: 1.8, marginBottom: 28 }}>
                Nascida do desejo de integrar as escolas rurais com as comunidades que as cercam, o projeto
                transforma o currículo escolar em ações práticas e sustentáveis.
              </p>
              <Link to="/sobre" className="btn-primary">Leia nossa história completa →</Link>
            </div>

            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 48px rgba(22,53,38,0.16)' }}>
              <img
                src="/hero-students.png"
                alt="Estudantes e agricultores participando da Feira Pedagógica"
                style={{ width: '100%', height: 'clamp(260px, 40vw, 460px)', objectFit: 'cover' }}
                loading="lazy"
                width={600}
                height={460}
              />
              <div style={{
                position: 'absolute', bottom: 16, left: 16,
                background: 'white', borderRadius: 9999,
                padding: '8px 18px',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, color: '#163526',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}>
                🌱 Aprender fazendo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTATÍSTICAS ─────────────────────────────────── */}
      <section style={{ background: '#fdf9ef', borderTop: '1px solid #e6e2d8', borderBottom: '1px solid #e6e2d8' }} aria-label="Números do projeto">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div aria-label={`${s.value} ${s.label}`} style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 700,
                  color: s.terra ? '#96472b' : '#1c1c16',
                  lineHeight: 1, marginBottom: 8,
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: '#727973', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSSAS EDIÇÕES ───────────────────────────────── */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', background: '#fdf9ef' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 64px)' }}>
            <p className="section-label">Histórico</p>
            <h2 className="section-heading">Nossa Jornada</h2>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#424843', maxWidth: 600, margin: '0 auto' }}>
              Acompanhe a evolução da Feira Pedagógica através das nossas edições.
            </p>
          </div>

          <div className="grid-4">
            {editions.map((e, i) => (
              <article key={i} className="card">
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={e.img}
                    alt={`${e.title} — ${e.desc.substring(0, 60)}`}
                    style={{ width: '100%', height: 'clamp(160px, 25vw, 200px)', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                    width={480}
                    height={200}
                  />
                  <span style={{
                    position: 'absolute', top: 10, left: 10,
                    background: e.current ? '#96472b' : '#163526',
                    color: 'white', padding: '3px 10px',
                    borderRadius: 9999, fontSize: 10, fontWeight: 700,
                  }}>
                    {e.tag}
                  </span>
                </div>
                <div style={{ padding: 'clamp(14px, 2vw, 20px)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 8 }}>{e.title}</h3>
                  <p style={{ fontSize: 14, color: '#424843', lineHeight: 1.6, marginBottom: 16 }}>{e.desc}</p>
                  <Link to={`/edicoes#${e.anchor}`} style={{
                    color: '#96472b', fontWeight: 700, fontSize: 13,
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    Ver Detalhes →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-section" aria-label="Chamada para participação">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }} aria-hidden="true">📅</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(22px, 4vw, 38px)',
            color: 'white', marginBottom: 16,
          }}>
            Faça parte desta transformação
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            opacity: 0.92, lineHeight: 1.75,
            marginBottom: 36,
            maxWidth: 580, margin: '0 auto 36px',
          }}>
            A Feira Pedagógica é um organismo vivo, construído a muitas mãos.
            Seja como visitante, voluntário ou parceiro, seu envolvimento ajuda
            a nutrir o futuro da nossa região.
          </p>
          <Link to="/contato" className="btn-tertiary" style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}>
            Acompanhe as próximas edições
          </Link>
        </div>
      </section>
    </main>
  )
}

const stats = [
  { value: '04',   label: 'Anos de Projeto',     terra: false },
  { value: '15',   label: 'Escolas Parceiras',   terra: true  },
  { value: '200+', label: 'Produtos Locais',     terra: false },
  { value: '150+', label: 'Famílias Envolvidas', terra: true  },
]

const editions = [
  { img: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=480&h=280&fit=crop&q=75', title: 'Ano 1', tag: 'Ano 1', current: false, anchor: 'ano-1', desc: 'O início de tudo. Plantamos as primeiras sementes da integração entre currículo escolar e comunidade serrana.' },
  { img: 'https://images.unsplash.com/photo-1488459716781-6f3ee1626495?w=480&h=280&fit=crop&q=75', title: 'Ano 2', tag: 'Ano 2', current: false, anchor: 'ano-2', desc: 'Expansão para 5 escolas e a primeira grande feira aberta ao público, celebrando a integração.' },
  { img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=480&h=280&fit=crop&q=75', title: 'Ano 3', tag: 'Ano 3', current: false, anchor: 'ano-3', desc: 'Consolidação do projeto pedagógico com cartilhas próprias e integração de famílias agricultoras.' },
  { img: 'https://images.unsplash.com/photo-1596618983183-eacd2b96efd1?w=480&h=280&fit=crop&q=75', title: 'Ano 4', tag: 'Ano 4 · Atual', current: true, anchor: 'ano-4', desc: 'Nossa maior edição, alcançando 15 escolas e criando uma rede sólida de desenvolvimento local.' },
]
