import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const menuItems = [
  { icon: '🏠', label: 'Dashboard',          path: '/admin/dashboard'  },
  { icon: '📅', label: 'Edições do Projeto', path: '/admin/edicoes'    },
  { icon: '📰', label: 'Notícias',           path: '/admin/noticias'   },
  { icon: '🛒', label: 'Produtos',           path: '/admin/produtos'   },
  { icon: '🖼️', label: 'Galeria',            path: '/admin/galeria'    },
  { icon: '🏫', label: 'Escolas',            path: '/admin/escolas'    },
  { icon: '💬', label: 'Depoimentos',        path: '/admin/depoimentos'},
  { icon: '⚙️', label: 'Configurações',      path: '/admin/config'     },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser]   = useState<string>('')
  const [active, setActive] = useState('/admin/dashboard')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login')
      else setUser(session.user.email ?? '')
    })
  }, [navigate])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1eee4' }}>

      {/* ── SIDEBAR ────────────────────────────────────── */}
      <aside style={{
        width: 260, background: '#163526', color: 'white',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
      }}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <img src="/logo-feira.png" alt="Logo" style={{ height: 52, mixBlendMode: 'screen', marginBottom: 8 }} />
          <p style={{ fontSize: 12, opacity: 0.6 }}>Painel Administrativo</p>
        </div>

        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setActive(item.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 24px', fontSize: 14, fontWeight: 500,
                color: active === item.path ? 'white' : 'rgba(255,255,255,0.65)',
                background: active === item.path ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderLeft: active === item.path ? '3px solid #e5a864' : '3px solid transparent',
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>{user}</p>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '8px', background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8,
            color: 'rgba(255,255,255,0.8)', fontSize: 13, cursor: 'pointer',
          }}>
            🚪 Sair
          </button>
        </div>
      </aside>

      {/* ── CONTEÚDO PRINCIPAL ─────────────────────────── */}
      <main style={{ flex: 1, marginLeft: 260, padding: '40px 48px' }}>
        {/* Header interno */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 4 }}>Dashboard</h1>
            <p style={{ fontSize: 14, color: '#424843' }}>Bem-vindo ao painel da Feira Pedagógica</p>
          </div>
          <Link to="/" style={{ fontSize: 13, color: '#163526', fontWeight: 600 }}>← Ver site público</Link>
        </div>

        {/* Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 40 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 16,
              padding: '24px', border: '1px solid #e6e2d8',
              boxShadow: '0 2px 8px rgba(22,53,38,0.06)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, color: m.terra ? '#96472b' : '#163526', marginBottom: 4 }}>
                {m.value}
              </div>
              <div style={{ fontSize: 13, color: '#727973', fontWeight: 600 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Ações rápidas */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, marginBottom: 20 }}>Ações Rápidas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {quickActions.map((a, i) => (
              <Link key={i} to={a.path} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px 20px', background: 'white',
                borderRadius: 12, border: '1px solid #e6e2d8',
                fontSize: 14, fontWeight: 600, color: '#163526',
                textDecoration: 'none', transition: 'all 0.15s',
              }}
                onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(22,53,38,0.12)'; (ev.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.boxShadow = ''; (ev.currentTarget as HTMLElement).style.transform = '' }}
              >
                <span style={{ fontSize: 22 }}>{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Últimas notícias */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e6e2d8', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>Últimas Notícias</h2>
            <Link to="/admin/noticias" className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Ver todas</Link>
          </div>
          <p style={{ fontSize: 14, color: '#727973', textAlign: 'center', padding: '32px 0' }}>
            As notícias cadastradas aparecerão aqui após a conexão com o Supabase.
          </p>
        </div>
      </main>
    </div>
  )
}

const metrics = [
  { icon: '📰', value: '0', label: 'Notícias',          terra: false },
  { icon: '🖼️', value: '0', label: 'Fotos',             terra: true  },
  { icon: '🛒', value: '0', label: 'Produtos',          terra: false },
  { icon: '🏫', value: '0', label: 'Escolas',           terra: true  },
]

const quickActions = [
  { icon: '✍️', label: 'Nova Notícia',    path: '/admin/noticias/novo'  },
  { icon: '📸', label: 'Adicionar Fotos', path: '/admin/galeria/novo'   },
  { icon: '🛒', label: 'Novo Produto',    path: '/admin/produtos/novo'  },
  { icon: '📅', label: 'Nova Edição',     path: '/admin/edicoes/novo'   },
]
