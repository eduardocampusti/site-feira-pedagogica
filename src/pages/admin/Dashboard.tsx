import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

interface Counts { noticias: number; fotos: number; produtos: number; escolas: number; edicoes: number }

export default function AdminDashboard() {
  const { profile, isAdmin } = useAuth()
  const [counts, setCounts] = useState<Counts>({ noticias: 0, fotos: 0, produtos: 0, escolas: 0, edicoes: 0 })
  const [ultimasNoticias, setUltimasNoticias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  const iconeHora = hora < 12 ? '🌄' : hora < 18 ? '☀️' : '🌙'
  const nomeUsuario = profile?.nome?.split(' ')[0] || 'Usuário'

  useEffect(() => { carregarDados() }, [])

  async function carregarDados() {
    const [n, f, p, e, ed] = await Promise.all([
      supabase.from('noticias').select('*', { count: 'exact', head: true }),
      supabase.from('galeria').select('*', { count: 'exact', head: true }),
      supabase.from('produtos').select('*', { count: 'exact', head: true }),
      supabase.from('escolas').select('*', { count: 'exact', head: true }),
      supabase.from('edicoes').select('*', { count: 'exact', head: true }),
    ])
    setCounts({ noticias: n.count ?? 0, fotos: f.count ?? 0, produtos: p.count ?? 0, escolas: e.count ?? 0, edicoes: ed.count ?? 0 })
    const { data } = await supabase.from('noticias').select('id,titulo,categoria,data_publicacao,publicado').order('created_at', { ascending: false }).limit(5)
    setUltimasNoticias(data || [])
    setLoading(false)
  }

  const metrics = [
    { icon: '📅', value: counts.edicoes,  label: 'Edições',  terra: false, path: '/admin/edicoes'  },
    { icon: '📰', value: counts.noticias, label: 'Notícias', terra: false, path: '/admin/noticias' },
    { icon: '🖼️', value: counts.fotos,    label: 'Fotos',    terra: true,  path: '/admin/galeria'  },
    { icon: '🛒', value: counts.produtos, label: 'Produtos', terra: false, path: '/admin/produtos' },
    { icon: '🏫', value: counts.escolas,  label: 'Escolas',  terra: true,  path: '/admin/escolas'  },
  ]

  // Ações rápidas filtradas por perfil
  const quickActions = [
    { icon: '✍️', label: 'Nova Notícia',    path: '/admin/noticias/novo',  todos: true  },
    { icon: '📸', label: 'Adicionar Fotos', path: '/admin/galeria',        todos: true  },
    { icon: '🛒', label: 'Novo Produto',    path: '/admin/produtos/novo',  todos: true  },
    { icon: '📅', label: 'Nova Edição',     path: '/admin/edicoes/novo',   todos: true  },
    { icon: '🏫', label: 'Nova Escola',     path: '/admin/escolas/novo',   todos: true  },
    { icon: '💬', label: 'Depoimentos',     path: '/admin/depoimentos',    todos: true  },
    { icon: '👥', label: 'Usuários',        path: '/admin/usuarios',       todos: false }, // só admin
    { icon: '⚙️', label: 'Configurações',   path: '/admin/configs',        todos: false }, // só admin
  ].filter(a => a.todos || isAdmin)

  return (
    <div style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: 1100 }}>

      {/* ── Boas-vindas ─────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #163526 0%, #2d4c3b 100%)',
        borderRadius: 16, padding: 'clamp(20px, 4vw, 32px)',
        marginBottom: 28, color: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 36 }}>{iconeHora}</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 3vw, 28px)', color: 'white', margin: 0 }}>
              {saudacao}, {nomeUsuario}!
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
              Feira Pedagógica da Região Serrana
            </p>
            {profile && (
              <span style={{
                background: profile.perfil === 'admin' ? '#e5a864' : 'rgba(255,255,255,0.2)',
                color: profile.perfil === 'admin' ? '#3a1a00' : 'white',
                padding: '3px 12px', borderRadius: 9999,
                fontSize: 11, fontWeight: 700,
              }}>
                {profile.perfil === 'admin' ? '👑 Administrador' : '📝 Editor'}
              </span>
            )}
          </div>
        </div>
        <Link to="/" style={{
          fontSize: 13, color: 'white', fontWeight: 600,
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.15)',
          padding: '9px 18px', borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.25)',
          whiteSpace: 'nowrap',
        }}>
          🌐 Ver site público
        </Link>
      </div>

      {/* ── Métricas ─────────────────────────────────── */}
      <div className="metrics-grid" style={{ marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <Link key={i} to={m.path} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: 14, padding: 'clamp(16px, 2vw, 20px)',
              border: '1px solid #e6e2d8',
              boxShadow: '0 2px 8px rgba(22,53,38,0.05)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(22,53,38,0.10)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(22,53,38,0.05)' }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, color: m.terra ? '#96472b' : '#163526', lineHeight: 1 }}>
                {loading ? '–' : m.value}
              </div>
              <div style={{ fontSize: 12, color: '#727973', fontWeight: 600, marginTop: 4 }}>{m.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Ações rápidas ────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 14 }}>Ações Rápidas</h2>
        <div className="quick-actions-grid">
          {quickActions.map((a, i) => (
            <Link key={i} to={a.path} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 16px', background: 'white',
              borderRadius: 10, border: '1px solid #e6e2d8',
              fontSize: 13, fontWeight: 600, color: '#163526',
              textDecoration: 'none', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(22,53,38,0.10)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.transform = '' }}
            >
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Últimas notícias ─────────────────────────── */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e6e2d8', padding: 'clamp(16px, 3vw, 24px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>Últimas Notícias</h2>
          <Link to="/admin/noticias" className="btn-primary" style={{ padding: '7px 14px', fontSize: 12 }}>Ver todas</Link>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#727973', padding: '24px 0' }}>Carregando...</p>
        ) : ultimasNoticias.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#727973', padding: '24px 0' }}>
            Nenhuma notícia ainda.{' '}
            <Link to="/admin/noticias/novo" style={{ color: '#96472b', fontWeight: 600 }}>Criar primeira →</Link>
          </p>
        ) : (
          <div className="table-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e6e2d8' }}>
                  {['Título', 'Categoria', 'Data', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '8px 0', textAlign: 'left', fontSize: 11, color: '#727973', fontWeight: 700, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ultimasNoticias.map(n => (
                  <tr key={n.id} style={{ borderBottom: '1px solid #f1eee4' }}>
                    <td style={{ padding: '12px 0', fontSize: 14, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.titulo}</td>
                    <td style={{ padding: '12px 8px', fontSize: 12, color: '#727973' }}>{n.categoria}</td>
                    <td style={{ padding: '12px 8px', fontSize: 12, color: '#727973', whiteSpace: 'nowrap' }}>{new Date(n.data_publicacao).toLocaleDateString('pt-BR')}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{ background: n.publicado ? '#c7ebd4' : '#ffdad6', color: n.publicado ? '#012113' : '#93000a', padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                        {n.publicado ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right' }}>
                      <Link to={`/admin/noticias/${n.id}`} style={{ fontSize: 12, color: '#163526', fontWeight: 600 }}>Editar →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
