import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

interface Counts { noticias: number; fotos: number; produtos: number; escolas: number; edicoes: number }

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ noticias: 0, fotos: 0, produtos: 0, escolas: 0, edicoes: 0 })
  const [ultimasNoticias, setUltimasNoticias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { carregarDados() }, [])

  async function carregarDados() {
    const [n, f, p, e, ed] = await Promise.all([
      supabase.from('noticias').select('*', { count: 'exact', head: true }),
      supabase.from('galeria').select('*', { count: 'exact', head: true }),
      supabase.from('produtos').select('*', { count: 'exact', head: true }),
      supabase.from('escolas').select('*', { count: 'exact', head: true }),
      supabase.from('edicoes').select('*', { count: 'exact', head: true }),
    ])
    setCounts({
      noticias: n.count ?? 0,
      fotos: f.count ?? 0,
      produtos: p.count ?? 0,
      escolas: e.count ?? 0,
      edicoes: ed.count ?? 0,
    })
    const { data } = await supabase.from('noticias').select('id,titulo,categoria,data_publicacao,publicado').order('created_at', { ascending: false }).limit(5)
    setUltimasNoticias(data || [])
    setLoading(false)
  }

  const metrics = [
    { icon: '📅', value: counts.edicoes, label: 'Edições', terra: false, path: '/admin/edicoes' },
    { icon: '📰', value: counts.noticias, label: 'Notícias', terra: false, path: '/admin/noticias' },
    { icon: '🖼️', value: counts.fotos, label: 'Fotos', terra: true, path: '/admin/galeria' },
    { icon: '🛒', value: counts.produtos, label: 'Produtos', terra: false, path: '/admin/produtos' },
    { icon: '🏫', value: counts.escolas, label: 'Escolas', terra: true, path: '/admin/escolas' },
  ]

  const quickActions = [
    { icon: '✍️', label: 'Nova Notícia',    path: '/admin/noticias/novo'  },
    { icon: '📸', label: 'Adicionar Fotos', path: '/admin/galeria'        },
    { icon: '🛒', label: 'Novo Produto',    path: '/admin/produtos/novo'  },
    { icon: '📅', label: 'Nova Edição',     path: '/admin/edicoes/novo'   },
    { icon: '🏫', label: 'Nova Escola',     path: '/admin/escolas/novo'   },
    { icon: '💬', label: 'Depoimentos',     path: '/admin/depoimentos'    },
    { icon: '⚙️', label: 'Configurações',   path: '/admin/configs'        },
    { icon: '🌐', label: 'Ver Site',        path: '/'                     },
  ]

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 4 }}>Dashboard</h1>
          <p style={{ fontSize: 14, color: '#424843' }}>Painel da Feira Pedagógica da Região Serrana</p>
        </div>
        <Link to="/" style={{ fontSize: 13, color: '#163526', fontWeight: 600, textDecoration: 'none', background: 'white', padding: '8px 16px', borderRadius: 8, border: '1px solid #e6e2d8' }}>
          🌐 Ver site público
        </Link>
      </div>

      {/* Métricas reais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 32 }}>
        {metrics.map((m, i) => (
          <Link key={i} to={m.path} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: 14, padding: '20px 16px',
              border: '1px solid #e6e2d8', boxShadow: '0 2px 8px rgba(22,53,38,0.05)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(22,53,38,0.10)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(22,53,38,0.05)' }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, color: m.terra ? '#96472b' : '#163526', lineHeight: 1 }}>
                {loading ? '–' : m.value}
              </div>
              <div style={{ fontSize: 12, color: '#727973', fontWeight: 600, marginTop: 4 }}>{m.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ações rápidas */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 16 }}>Ações Rápidas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
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

      {/* Últimas notícias cadastradas */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e6e2d8', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>Últimas Notícias Cadastradas</h2>
          <Link to="/admin/noticias" className="btn-primary" style={{ padding: '7px 14px', fontSize: 12 }}>Ver todas</Link>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#727973', padding: '24px 0' }}>Carregando...</p>
        ) : ultimasNoticias.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#727973', padding: '24px 0' }}>
            Nenhuma notícia cadastrada ainda.{' '}
            <Link to="/admin/noticias/novo" style={{ color: '#96472b', fontWeight: 600 }}>Criar primeira →</Link>
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e6e2d8' }}>
                <th style={{ padding: '8px 0', textAlign: 'left', fontSize: 12, color: '#727973', fontWeight: 600 }}>Título</th>
                <th style={{ padding: '8px 0', textAlign: 'left', fontSize: 12, color: '#727973', fontWeight: 600 }}>Categoria</th>
                <th style={{ padding: '8px 0', textAlign: 'left', fontSize: 12, color: '#727973', fontWeight: 600 }}>Data</th>
                <th style={{ padding: '8px 0', textAlign: 'left', fontSize: 12, color: '#727973', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '8px 0', fontSize: 12, color: '#727973', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {ultimasNoticias.map(n => (
                <tr key={n.id} style={{ borderBottom: '1px solid #f1eee4' }}>
                  <td style={{ padding: '12px 0', fontSize: 14 }}>{n.titulo}</td>
                  <td style={{ padding: '12px 0', fontSize: 12, color: '#727973' }}>{n.categoria}</td>
                  <td style={{ padding: '12px 0', fontSize: 12, color: '#727973' }}>{new Date(n.data_publicacao).toLocaleDateString('pt-BR')}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{ background: n.publicado ? '#c7ebd4' : '#ffdad6', color: n.publicado ? '#012113' : '#93000a', padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600 }}>
                      {n.publicado ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right' }}>
                    <Link to={`/admin/noticias/${n.id}`} style={{ fontSize: 12, color: '#163526', fontWeight: 600, textDecoration: 'none' }}>Editar →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
