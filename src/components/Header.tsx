import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      background: '#fdf9ef',
      borderBottom: '1px solid #e6e2d8',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 8px rgba(22,53,38,0.07)',
    }}>
      <div className="container" style={{
        height: 80,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}>
        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0 }}>
          <img
            src="/logo-feira.png"
            alt="Feira Livre Pedagógica"
            style={{ height: 64, width: 'auto', mixBlendMode: 'multiply' }}
          />
        </Link>

        {/* Nav desktop */}
        <nav style={{
          display: menuOpen ? 'none' : 'flex',
          gap: 4,
          flex: 1,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }} className="nav-desktop">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: '#1c1c16',
                padding: '6px 12px',
                borderRadius: isActive ? 0 : 8,
                borderBottom: isActive ? '2px solid #163526' : 'none',
                transition: 'all 0.15s',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Ações header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Link to="/admin/login" className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
            Área do Administrador
          </Link>
          {/* Hamburguer mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
            aria-label="Menu"
            className="hamburger"
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#1c1c16', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#1c1c16', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#1c1c16', borderRadius: 2 }} />
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 80,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fdf9ef',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 20px',
          gap: 4,
          zIndex: 999,
          borderTop: '1px solid #e6e2d8',
        }}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 18, padding: '12px 16px', borderRadius: 8, color: '#1c1c16' }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

const navLinks = [
  { to: '/',          label: 'Início'   },
  { to: '/sobre',     label: 'Sobre'    },
  { to: '/edicoes',   label: 'Edições'  },
  { to: '/noticias',  label: 'Notícias' },
  { to: '/produtos',  label: 'Produtos' },
  { to: '/galeria',   label: 'Galeria'  },
  { to: '/escolas',   label: 'Escolas'  },
  { to: '/contato',   label: 'Contato'  },
]
