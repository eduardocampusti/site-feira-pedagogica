import { Link } from 'react-router-dom'
import { useConfigSite } from '../hooks/useConfigSite'

export default function Home() {
  const { config } = useConfigSite()
  const heroImage = config?.imagem_hero || '/hero-banner.png'
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: 640,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        overflow: 'hidden',
      }}>
        {/* Imagem de fundo via <img> para garantir cover correto */}
        <img
          src={heroImage}
          alt="Feira Pedagógica"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            zIndex: 0,
          }}
        />
        {/* Overlay sutil para legibilidade do texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.30) 50%, rgba(253,249,239,0.0) 100%)',
          zIndex: 1,
        }} />
        {/* Fade suave na base para transição com seção abaixo */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to top, #fdf9ef 0%, transparent 100%)',
          zIndex: 2,
        }} />
        {/* Conteúdo */}
        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: 860, padding: '80px 24px' }}>
          <span style={{
            display: 'inline-block',
            background: '#e5a864',
            color: '#3a1a00',
            padding: '6px 20px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            ✦ EDIÇÃO 2024 ✦
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
            color: 'white',
            textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.4)',
          }}>
            Feira Pedagógica<br />da Região Serrana
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            lineHeight: 1.7,
            marginBottom: 36,
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}>
            Educação, agricultura familiar e comunidade<br />
            transformando saberes em experiências.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/sobre" className="btn-primary" style={{ fontSize: 16, padding: '14px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Conheça o Projeto
            </Link>
            <Link to="/noticias" style={{
              fontSize: 16, padding: '13px 26px',
              border: '2px solid rgba(255,255,255,0.85)',
              borderRadius: 8,
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.12)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
            }}>
              Ver Notícias
            </Link>
          </div>
        </div>
      </section>

      {/* ── ESSÊNCIA ─────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#fdf9ef' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p className="section-label">Nossa Essência</p>
            <h2 className="section-heading">O que é a<br />Feira Pedagógica?</h2>
            <p style={{ fontSize: 17, color: '#1c1c16', lineHeight: 1.75, marginBottom: 20 }}>
              A Feira Pedagógica da Região Serrana é um espaço vibrante de diálogo entre educação
              formal e educação comunitária. Alunos, professores, produtores familiares e a comunidade
              local colaboram para cultivar não apenas alimentos, mas conhecimento e sustentabilidade.
            </p>
            <p style={{ fontSize: 16, color: '#424843', lineHeight: 1.75, marginBottom: 28 }}>
              Nascida do desejo de integrar as escolas rurais com as comunidades que as cercam, o projeto
              transforma o currículo escolar em ações práticas e sustentáveis. Cada edição é uma
              celebração da nossa terra e das mentes que a cultivam.
            </p>
            <Link to="/sobre" className="btn-primary">Leia nossa história completa →</Link>
          </div>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px rgba(22,53,38,0.18)' }}>
            <img src="/hero-students.png" alt="Estudantes e agricultores" style={{ width: '100%', height: 460, objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', bottom: 24, left: 24,
              background: 'white', borderRadius: 9999,
              padding: '10px 20px',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 600, color: '#163526',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}>
              🌱 Aprender fazendo
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTATÍSTICAS ─────────────────────────────────── */}
      <section style={{ padding: '64px 0', background: '#fdf9ef', borderTop: '1px solid #e6e2d8', borderBottom: '1px solid #e6e2d8' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', borderLeft: i > 0 ? '1px solid #e6e2d8' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px,5vw,56px)', fontWeight: 700, color: s.terra ? '#96472b' : '#1c1c16', lineHeight: 1, marginBottom: 12 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: '#727973', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOSSA JORNADA ────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#fdf9ef' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label">Histórico</p>
            <h2 className="section-heading">Nossa Jornada</h2>
            <p style={{ fontSize: 18, color: '#424843', maxWidth: 600, margin: '0 auto' }}>
              Acompanhe a evolução da Feira Pedagógica através das nossas edições passadas.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {editions.map((e, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #e6e2d8', transition: 'all 0.3s' }}
                onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (ev.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(22,53,38,0.12)' }}
                onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.transform = ''; (ev.currentTarget as HTMLElement).style.boxShadow = '' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={e.img} alt={e.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 10, left: 10, background: e.current ? '#96472b' : '#163526', color: 'white', padding: '3px 10px', borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
                    {e.tag}
                  </span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 8 }}>{e.title}</h3>
                  <p style={{ fontSize: 14, color: '#424843', lineHeight: 1.6, marginBottom: 16, minHeight: 60 }}>{e.desc}</p>
                  <Link to={`/edicoes#${e.anchor}`} style={{ color: '#96472b', fontWeight: 600, fontSize: 13 }}>Ver Detalhes →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#163526 0%,#2d4c3b 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 52, marginBottom: 24 }}>📅</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3vw,38px)', color: 'white', marginBottom: 16 }}>
            Faça parte desta transformação
          </h2>
          <p style={{ fontSize: 18, opacity: 0.92, lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            A Feira Pedagógica é um organismo vivo, construído a muitas mãos. Seja como visitante,
            voluntário ou parceiro, seu envolvimento ajuda a nutrir o futuro da nossa região.
          </p>
          <Link to="/contato" className="btn-tertiary" style={{ fontSize: 16, padding: '14px 28px' }}>
            Acompanhe as próximas edições
          </Link>
        </div>
      </section>
    </main>
  )
}

const stats = [
  { value: '04',   label: 'Anos de Projeto',    terra: false },
  { value: '15',   label: 'Escolas Parceiras',  terra: true  },
  { value: '200+', label: 'Produtos Locais',    terra: false },
  { value: '150+', label: 'Famílias Envolvidas',terra: true  },
]

const editions = [
  { img: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=480&h=280&fit=crop&q=80', title: 'Ano 1', tag: 'Ano 1', current: false, anchor: 'ano-1', desc: 'O início de tudo. Plantamos as primeiras sementes da integração entre currículo escolar e comunidade serrana...' },
  { img: 'https://images.unsplash.com/photo-1488459716781-6f3ee1626495?w=480&h=280&fit=crop&q=80', title: 'Ano 2', tag: 'Ano 2', current: false, anchor: 'ano-2', desc: 'Expansão para 5 escolas e a primeira grande feira aberta ao público, celebrando a integração de...' },
  { img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=480&h=280&fit=crop&q=80', title: 'Ano 3', tag: 'Ano 3', current: false, anchor: 'ano-3', desc: 'Consolidação do projeto pedagógico com cartilhas próprias e integração de famílias agricultoras...' },
  { img: 'https://images.unsplash.com/photo-1596618983183-eacd2b96efd1?w=480&h=280&fit=crop&q=80', title: 'Ano 4', tag: 'Ano 4 · Atual', current: true, anchor: 'ano-4', desc: 'Nossa maior edição, alcançando 15 escolas e criando uma rede sólida de desenvolvimento local...' },
]
