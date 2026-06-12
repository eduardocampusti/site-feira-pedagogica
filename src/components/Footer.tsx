import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#31312a', color: '#f4f0e6', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 48,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* Marca */}
          <div>
            <img
              src="/logo-feira.png"
              alt="Feira Livre Pedagógica"
              style={{ height: 56, width: 'auto', marginBottom: 16, mixBlendMode: 'screen' }}
            />
            <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75 }}>
              Cultivando Saberes, Colhendo Futuros. Um projeto dedicado à educação,
              sustentabilidade e comunidade.
            </p>
          </div>

          {/* Institucional */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 20, color: 'white' }}>
              Institucional
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/sobre', label: 'Sobre Nós' },
                { to: '/sobre', label: 'Nossa História' },
                { to: '/escolas', label: 'Escolas Participantes' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, transition: 'color 0.15s' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ações */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 20, color: 'white' }}>
              Ações
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/edicoes',  label: 'Edições'        },
                { to: '/noticias', label: 'Notícias'       },
                { to: '/produtos', label: 'Produtos Locais'},
                { to: '/galeria',  label: 'Galeria'        },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 20, color: 'white' }}>
              Legal
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Privacidade', 'Termos de Uso', 'Mapa do Site'].map(label => (
                <li key={label}>
                  <Link to="#" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>{label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contato" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Imprensa</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, opacity: 0.6 }}>
              © {new Date().getFullYear()} Feira Pedagógica da Região Serrana. Todos os direitos reservados.
            </p>
            <p style={{ fontSize: 13, opacity: 0.6 }}>
              Secretaria Municipal de Educação · Brotas de Macaúbas, BA
            </p>
          </div>
          <Link to="/admin/login" className="btn-secondary" style={{ fontSize: 12, padding: '6px 14px', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>
            Área do Administrador
          </Link>
        </div>
      </div>
    </footer>
  )
}
