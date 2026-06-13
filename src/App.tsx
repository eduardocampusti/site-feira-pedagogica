import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Páginas públicas
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Edicoes from './pages/Edicoes'
import EdicaoDetalhe from './pages/EdicaoDetalhe'
import Noticias from './pages/Noticias'
import NoticiaDetalhe from './pages/NoticiaDetalhe'
import Produtos from './pages/Produtos'
import Galeria from './pages/Galeria'
import Escolas from './pages/Escolas'
import EscolaDetalhe from './pages/EscolaDetalhe'
import Contato from './pages/Contato'

// Admin
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminNoticias from './pages/admin/AdminNoticias'
import AdminNoticiaForm from './pages/admin/AdminNoticiaForm'
import AdminEdicoes from './pages/admin/AdminEdicoes'
import AdminEdicaoForm from './pages/admin/AdminEdicaoForm'
import AdminProdutos from './pages/admin/AdminProdutos'
import AdminProdutoForm from './pages/admin/AdminProdutoForm'
import AdminEscolas from './pages/admin/AdminEscolas'
import AdminEscolaForm from './pages/admin/AdminEscolaForm'
import AdminGaleria from './pages/admin/AdminGaleria'
import AdminDepoimentos from './pages/admin/AdminDepoimentos'
import AdminConfigs from './pages/admin/AdminConfigs'
import AdminUsuarios from './pages/admin/AdminUsuarios'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (<><Header />{children}<Footer /></>)
}

function AdminSidebar() {
  const { signOut, isAdmin, profile } = useAuth()
  const navigate = useNavigate()

  async function logout() {
    await signOut()
    navigate('/admin/login')
  }

  // Menu base para todos
  const menuBase = [
    { icon: '🏠', label: 'Dashboard',    path: '/admin/dashboard'   },
    { icon: '📅', label: 'Edições',      path: '/admin/edicoes'     },
    { icon: '📰', label: 'Notícias',     path: '/admin/noticias'    },
    { icon: '🛒', label: 'Produtos',     path: '/admin/produtos'    },
    { icon: '🏫', label: 'Escolas',      path: '/admin/escolas'     },
    { icon: '🖼️', label: 'Galeria',      path: '/admin/galeria'     },
    { icon: '💬', label: 'Depoimentos',  path: '/admin/depoimentos' },
  ]

  // Itens exclusivos do admin
  const menuAdmin = [
    { icon: '👥', label: 'Usuários',     path: '/admin/usuarios'    },
    { icon: '⚙️', label: 'Configurações',path: '/admin/configs'     },
  ]

  const menu = isAdmin ? [...menuBase, ...menuAdmin] : menuBase

  return (
    <aside style={{
      width: 240, background: '#163526', color: 'white',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 200,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <img src="/logo-feira.png" alt="Logo" style={{ height: 44, mixBlendMode: 'screen', marginBottom: 6 }} />
        <p style={{ fontSize: 10, opacity: 0.5, margin: 0 }}>Painel Administrativo</p>
      </div>

      {/* Badge do perfil */}
      {profile && (
        <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: profile.perfil === 'admin' ? '#e5a864' : 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700,
              color: profile.perfil === 'admin' ? '#3a1a00' : 'white',
              flexShrink: 0,
            }}>
              {profile.nome?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'white', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profile.nome}
              </p>
              <p style={{ fontSize: 10, opacity: 0.55, margin: 0 }}>
                {profile.perfil === 'admin' ? '👑 Administrador' : '📝 Editor'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {menu.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 20px', fontSize: 13, fontWeight: 500,
              color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
              background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
              borderLeft: isActive ? '3px solid #e5a864' : '3px solid transparent',
              textDecoration: 'none', transition: 'all 0.15s',
            })}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Rodapé sidebar */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NavLink to="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
          ← Ver site público
        </NavLink>
        <button onClick={logout} style={{
          width: '100%', padding: '8px', background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8,
          color: 'rgba(255,255,255,0.8)', fontSize: 12, cursor: 'pointer',
        }}>
          🚪 Sair
        </button>
      </div>
    </aside>
  )
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1eee4' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: 240 }}>
        {children}
      </div>
    </div>
  )
}

function AdminRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  if (adminOnly && !isAdmin) {
    navigate('/admin/dashboard')
    return null
  }
  return <ProtectedRoute><AdminLayout>{children}</AdminLayout></ProtectedRoute>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Públicas ── */}
          <Route path="/"           element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/sobre"      element={<PublicLayout><Sobre /></PublicLayout>} />
          <Route path="/edicoes"    element={<PublicLayout><Edicoes /></PublicLayout>} />
          <Route path="/edicoes/:id" element={<PublicLayout><EdicaoDetalhe /></PublicLayout>} />
          <Route path="/noticias"   element={<PublicLayout><Noticias /></PublicLayout>} />
          <Route path="/noticias/:id" element={<PublicLayout><NoticiaDetalhe /></PublicLayout>} />
          <Route path="/produtos"   element={<PublicLayout><Produtos /></PublicLayout>} />
          <Route path="/galeria"    element={<PublicLayout><Galeria /></PublicLayout>} />
          <Route path="/escolas"    element={<PublicLayout><Escolas /></PublicLayout>} />
          <Route path="/escolas/:id" element={<PublicLayout><EscolaDetalhe /></PublicLayout>} />
          <Route path="/contato"    element={<PublicLayout><Contato /></PublicLayout>} />

          {/* ── Admin ── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Rotas de todos (admin + editor) */}
          <Route path="/admin/dashboard"    element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/noticias"     element={<AdminRoute><AdminNoticias /></AdminRoute>} />
          <Route path="/admin/noticias/novo" element={<AdminRoute><AdminNoticiaForm /></AdminRoute>} />
          <Route path="/admin/noticias/:id"  element={<AdminRoute><AdminNoticiaForm /></AdminRoute>} />
          <Route path="/admin/edicoes"      element={<AdminRoute><AdminEdicoes /></AdminRoute>} />
          <Route path="/admin/edicoes/novo"  element={<AdminRoute><AdminEdicaoForm /></AdminRoute>} />
          <Route path="/admin/edicoes/:id"   element={<AdminRoute><AdminEdicaoForm /></AdminRoute>} />
          <Route path="/admin/produtos"     element={<AdminRoute><AdminProdutos /></AdminRoute>} />
          <Route path="/admin/produtos/novo" element={<AdminRoute><AdminProdutoForm /></AdminRoute>} />
          <Route path="/admin/produtos/:id"  element={<AdminRoute><AdminProdutoForm /></AdminRoute>} />
          <Route path="/admin/escolas"      element={<AdminRoute><AdminEscolas /></AdminRoute>} />
          <Route path="/admin/escolas/novo"  element={<AdminRoute><AdminEscolaForm /></AdminRoute>} />
          <Route path="/admin/escolas/:id"   element={<AdminRoute><AdminEscolaForm /></AdminRoute>} />
          <Route path="/admin/galeria"      element={<AdminRoute><AdminGaleria /></AdminRoute>} />
          <Route path="/admin/depoimentos"  element={<AdminRoute><AdminDepoimentos /></AdminRoute>} />

          {/* Rotas exclusivas admin */}
          <Route path="/admin/usuarios"     element={<AdminRoute adminOnly><AdminUsuarios /></AdminRoute>} />
          <Route path="/admin/configs"      element={<AdminRoute adminOnly><AdminConfigs /></AdminRoute>} />

          <Route path="*" element={<PublicLayout><div style={{ padding: '80px 0', textAlign: 'center' }}>Página não encontrada</div></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
