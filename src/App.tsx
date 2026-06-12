import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import AdminConfigs from './pages/admin/AdminConfigs'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (<><Header />{children}<Footer /></>)
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1eee4' }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, background: '#163526', color: 'white',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        overflow: 'auto', padding: '20px 0'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <img src="/logo-feira.png" alt="Logo" style={{ height: 48, mixBlendMode: 'screen' }} />
        </div>
        <nav style={{ padding: '16px 0' }}>
          {[
            { icon: '🏠', label: 'Dashboard', path: '/admin/dashboard' },
            { icon: '📰', label: 'Notícias', path: '/admin/noticias' },
            { icon: '📅', label: 'Edições', path: '/admin/edicoes' },
            { icon: '🛒', label: 'Produtos', path: '/admin/produtos' },
            { icon: '🏫', label: 'Escolas', path: '/admin/escolas' },
            { icon: '🖼️', label: 'Galeria', path: '/admin/galeria' },
            { icon: '⚙️', label: 'Configurações', path: '/admin/configs' },
          ].map(item => (
            <a key={item.path} href={item.path} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 24px', fontSize: 14, color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none'
            }}>
              <span>{item.icon}</span> {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Conteúdo */}
      <div style={{ flex: 1, marginLeft: 260 }}>
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
        <Route path="/contato" element={<PublicLayout><Contato /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/noticias" element={<ProtectedRoute><AdminLayout><AdminNoticias /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/noticias/novo" element={<ProtectedRoute><AdminLayout><AdminNoticiaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/noticias/:id" element={<ProtectedRoute><AdminLayout><AdminNoticiaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/edicoes" element={<ProtectedRoute><AdminLayout><AdminEdicoes /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/edicoes/novo" element={<ProtectedRoute><AdminLayout><AdminEdicaoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/edicoes/:id" element={<ProtectedRoute><AdminLayout><AdminEdicaoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/produtos" element={<ProtectedRoute><AdminLayout><AdminProdutos /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/produtos/novo" element={<ProtectedRoute><AdminLayout><AdminProdutoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/produtos/:id" element={<ProtectedRoute><AdminLayout><AdminProdutoForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/escolas" element={<ProtectedRoute><AdminLayout><AdminEscolas /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/escolas/novo" element={<ProtectedRoute><AdminLayout><AdminEscolaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/escolas/:id" element={<ProtectedRoute><AdminLayout><AdminEscolaForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/galeria" element={<ProtectedRoute><AdminLayout><AdminGaleria /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/configs" element={<ProtectedRoute><AdminLayout><AdminConfigs /></AdminLayout></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<PublicLayout><div style={{ padding: '80px 0', textAlign: 'center' }}>Página não encontrada</div></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
