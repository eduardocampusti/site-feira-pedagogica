import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/',         label: 'Início'   },
  { to: '/sobre',    label: 'Sobre'    },
  { to: '/edicoes',  label: 'Edições'  },
  { to: '/noticias', label: 'Notícias' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/galeria',  label: 'Galeria'  },
  { to: '/escolas',  label: 'Escolas'  },
  { to: '/contato',  label: 'Contato'  },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const btnRef  = useRef<HTMLButtonElement>(null)

  // Fecha ao navegar
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Fecha ao apertar ESC
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); btnRef.current?.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  // Trava scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header style={{
        background: '#fdf9ef',
        borderBottom: '1px solid #e6e2d8',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 8px rgba(22,53,38,0.07)',
      }}>
        <div className="container">
          <div className="header-inner">

            {/* Logo */}
            <Link
              to="/"
              className="header-logo"
              aria-label="Feira Pedagógica da Região Serrana — Página Inicial"
            >
              <img
                src="/logo-feira.png"
                alt="Feira Livre Pedagógica"
                style={{ mixBlendMode: 'multiply' }}
                width={64}
                height={64}
                loading="eager"
              />
            </Link>

            {/* Nav desktop */}
            <nav className="nav-desktop" aria-label="Navegação principal">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  aria-current={location.pathname === to ? 'page' : undefined}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Ações */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
              <Link
                to="/admin/login"
                className="btn-primary btn-admin-header"
                aria-label="Acessar área do administrador"
              >
                <span className="hide-mobile" aria-hidden="true">Área do </span>Administrador
              </Link>

              {/* Hamburguer */}
              <button
                ref={btnRef}
                className={`hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-expanded={menuOpen}
                aria-controls="nav-mobile"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay escuro atrás do menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, top: 68,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 997,
          }}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Nav mobile */}
      {menuOpen && (
        <nav
          id="nav-mobile"
          ref={menuRef}
          className="nav-mobile"
          aria-label="Menu de navegação"
          role="dialog"
          aria-modal="true"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              aria-current={location.pathname === to ? 'page' : undefined}
              style={{ color: '#1c1c16' }}
            >
              {label}
            </NavLink>
          ))}

          <div className="nav-mobile-admin">
            <Link
              to="/admin/login"
              className="btn-primary"
              onClick={() => setMenuOpen(false)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              🔐 Área do Administrador
            </Link>
          </div>
        </nav>
      )}
    </>
  )
}
