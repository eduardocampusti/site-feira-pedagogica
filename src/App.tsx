import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
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

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (<><Header />{children}<Footer /></>)
}

const adminMenu = [
  { icon: '🏠', label: 'Dashboard',    path: '/admin/dashboard'  },
  { icon: '📅', label: 'Edições',      path: '/admin/edicoes'    },
  { icon: '📰', label: 'Notícias',     path: '/admin/noticias'   },
  { icon: '🛒', label: 'Produtos',     path: '/admin/produtos'   },
  { icon: '🏫', label: 'Escolas',      path: '/admin/escolas'    },
  { icon: '🖼️', label: 'Galeria',      path: '/admin/galeria'    },
  { icon: '💬', label: 'Depoimentos',  path: '/admin/depoimentos'},
  { icon: '⚙️', label: 'Configurações',path: '/admin/configs'    },
]

function AdminSidebar() {
  const navigate = useNavigate()
  async function logout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }
  return (
    <aside style={{
      width: 240, background: '#163526', color: 'white',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
    }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <img src="/logo-feira.png" alt="Logo" style={{ height: 48, mixBlendMode: 'screen', marginBottom: 6 }} />
        <p style={{ fontSize: 11, opacity: 0.5, margin: 0 }}>Painel Administrativo</p>
      </div>
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {adminMenu.map(item => (
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
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NavLink to="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/sobre" element={<PublicLayout><Sobre /></PublicLayout>} />
        <Route path="/edicoes" element={<PublicLayout><Edicoes /></PublicLayout>} />
        <Route path="/edicoes/:id" element={<PublicLayout><EdicaoDetalhe /></PublicLayout>} />
        <Route path="/noticias" element={<PublicLayout><Noticias /></PublicLayout>} />
        <Route path="/noticias/:id" element={<PublicLayout><NoticiaDetalhe /></PublicLayout>} />
        <Route path="/produtos" element={<PublicLayout><Produtos /></PublicLayout>} />
        <Route path="/galeria" element={<PublicLayout><Galeria /></PublicLayout>} />
        <Route path="/escolas" element={<PublicLayout><Escolas /></PublicLayout>} />
        <Route path="/escolas/:id" element={<PublicLayout><EscolaDetalhe /></PublicLayout>} />
        <Route path="/contato" element={<PublicLayout><Contato /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/noticias"    element={<ProtectedRoute><AdminLayout><AdminNoticias /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/noticias/novo" element={<ProtectedRoute><AdminLayout><AdminNoticiaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/noticias/:id"  element={<ProtectedRoute><AdminLayout><AdminNoticiaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/edicoes"     element={<ProtectedRoute><AdminLayout><AdminEdicoes /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/edicoes/novo"  element={<ProtectedRoute><AdminLayout><AdminEdicaoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/edicoes/:id"   element={<ProtectedRoute><AdminLayout><AdminEdicaoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/produtos"    element={<ProtectedRoute><AdminLayout><AdminProdutos /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/produtos/novo" element={<ProtectedRoute><AdminLayout><AdminProdutoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/produtos/:id"  element={<ProtectedRoute><AdminLayout><AdminProdutoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/escolas"     element={<ProtectedRoute><AdminLayout><AdminEscolas /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/escolas/novo"  element={<ProtectedRoute><AdminLayout><AdminEscolaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/escolas/:id"   element={<ProtectedRoute><AdminLayout><AdminEscolaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/galeria"     element={<ProtectedRoute><AdminLayout><AdminGaleria /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/depoimentos" element={<ProtectedRoute><AdminLayout><AdminDepoimentos /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/configs"     element={<ProtectedRoute><AdminLayout><AdminConfigs /></AdminLayout></ProtectedRoute>} />

        <Route path="*" element={<PublicLayout><div style={{ padding: '80px 0', textAlign: 'center' }}>Página não encontrada</div></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
