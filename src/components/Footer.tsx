import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#31312a', color: '#f4f0e6', padding: 'clamp(40px, 6vw, 64px) 0 32px' }}>
      <div className="container">
        <div className="footer-grid">

          {/* Marca */}
          <div>
            <img
              src="/logo-feira.png"
              alt="Feira Livre Pedagógica"
              style={{ height: 56, width: 'auto', marginBottom: 16, mixBlendMode: 'screen' }}
              loading="lazy"
              width={100}
              height={56}
            />
            <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.75, maxWidth: 320 }}>
              Cultivando Saberes, Colhendo Futuros. Um projeto dedicado à educação,
              sustentabilidade e comunidade serrana.
            </p>
            {/* Redes sociais */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { label: 'Facebook',  icon: '📘', href: '#' },
                { label: 'Instagram', icon: '📸', href: '#' },
                { label: 'YouTube',   icon: '▶️', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)',
                    fontSize: 18, transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
                >
                  <span aria-hidden="true">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 20, color: 'white' }}>
              Institucional
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/sobre',   label: 'Sobre o Projeto'    },
                { to: '/sobre',   label: 'Nossa História'      },
                { to: '/escolas', label: 'Escolas Parceiras'   },
                { to: '/contato', label: 'Contato'             },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} style={{
                    color: 'rgba(255,255,255,0.65)', fontSize: 14,
                    transition: 'color 0.15s', display: 'block',
                    minHeight: 28, paddingBlock: 2,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ações */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 20, color: 'white' }}>
              Conteúdo
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/edicoes',  label: 'Edições'         },
                { to: '/noticias', label: 'Notícias'        },
                { to: '/produtos', label: 'Produtos Locais' },
                { to: '/galeria',  label: 'Galeria de Fotos'},
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} style={{
                    color: 'rgba(255,255,255,0.65)', fontSize: 14,
                    transition: 'color 0.15s', display: 'block', minHeight: 28, paddingBlock: 2,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 20, color: 'white' }}>
              Contato
            </h3>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                📍 Brotas de Macaúbas, BA<br />
                Secretaria Municipal de Educação
              </p>
              <a href="mailto:seceducbrotasdemacaubas@gmail.com"
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', wordBreak: 'break-all', display: 'block', minHeight: 28, paddingBlock: 2 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
              >
                📧 seceducbrotasdemacaubas@gmail.com
              </a>
            </address>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="footer-bottom">
          <div>
            <p style={{ fontSize: 13, opacity: 0.55 }}>
              © {new Date().getFullYear()} Feira Pedagógica da Região Serrana. Todos os direitos reservados.
            </p>
            <p style={{ fontSize: 13, opacity: 0.55, marginTop: 4 }}>
              Secretaria Municipal de Educação · Brotas de Macaúbas, BA
            </p>
          </div>
          <Link
            to="/admin/login"
            style={{
              fontSize: 12, padding: '8px 14px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, color: 'rgba(255,255,255,0.5)',
              whiteSpace: 'nowrap', minHeight: 36, display: 'inline-flex', alignItems: 'center',
            }}
          >
            🔐 Área do Administrador
          </Link>
        </div>
      </div>
    </footer>
  )
}
