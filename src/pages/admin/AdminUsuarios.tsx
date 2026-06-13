import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import type { UserProfile } from '../../hooks/useAuth'

export default function AdminUsuarios() {
  const { isAdmin, profile } = useAuth()
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [criando, setCriando] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', senha: '', perfil: 'editor' as 'admin' | 'editor' })
  const [msg, setMsg] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null)

  // Só admin acessa
  useEffect(() => {
    if (!isAdmin) navigate('/admin/dashboard')
    else carregar()
  }, [isAdmin])

  async function carregar() {
    const { data } = await supabase.from('user_profiles').select('*').order('created_at')
    setUsuarios((data as UserProfile[]) || [])
    setLoading(false)
  }

  async function criarUsuario(e: React.FormEvent) {
    e.preventDefault()
    setCriando(true)
    setMsg(null)

    try {
      // 1. Criar no Auth via signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.senha,
      })

      if (authError) throw new Error(authError.message)
      if (!authData.user) throw new Error('Usuário não foi criado')

      // 2. Criar perfil na tabela
      const { error: profileError } = await supabase.from('user_profiles').upsert({
        id: authData.user.id,
        nome: form.nome,
        email: form.email,
        perfil: form.perfil,
        ativo: true,
      })

      if (profileError) throw new Error(profileError.message)

      setMsg({ tipo: 'ok', texto: `✅ Usuário "${form.nome}" criado com perfil ${form.perfil}!` })
      setForm({ nome: '', email: '', senha: '', perfil: 'editor' })
      carregar()
    } catch (err: any) {
      setMsg({ tipo: 'erro', texto: `❌ Erro: ${err.message}` })
    } finally {
      setCriando(false)
    }
  }

  async function alterarPerfil(id: string, novoPerfil: 'admin' | 'editor') {
    if (id === profile?.id) { alert('Você não pode alterar seu próprio perfil.'); return }
    await supabase.from('user_profiles').update({ perfil: novoPerfil }).eq('id', id)
    carregar()
  }

  async function toggleAtivo(id: string, ativo: boolean) {
    if (id === profile?.id) { alert('Você não pode desativar sua própria conta.'); return }
    await supabase.from('user_profiles').update({ ativo: !ativo }).eq('id', id)
    carregar()
  }

  async function deletarUsuario(id: string, nome: string) {
    if (id === profile?.id) { alert('Você não pode deletar sua própria conta.'); return }
    if (!confirm(`Deletar o usuário "${nome}"? Esta ação não pode ser desfeita.`)) return
    await supabase.from('user_profiles').delete().eq('id', id)
    carregar()
  }

  const inp = { width: '100%', padding: '11px 14px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 15, fontFamily: 'var(--font-body)' } as React.CSSProperties

  return (
    <div style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: 1000 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 8 }}>Usuários do Sistema</h1>
      <p style={{ color: '#727973', fontSize: 14, marginBottom: 32 }}>
        Gerencie administradores e editores do painel.
      </p>

      {/* Formulário novo usuário */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e6e2d8', padding: 28, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#163526', marginBottom: 20 }}>
          ➕ Criar Novo Usuário
        </h2>

        {msg && (
          <div style={{ padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14, fontWeight: 600,
            background: msg.tipo === 'ok' ? '#c7ebd4' : '#ffdad6',
            color: msg.tipo === 'ok' ? '#012113' : '#93000a',
          }}>
            {msg.texto}
          </div>
        )}

        <form onSubmit={criarUsuario}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, color: '#424843' }}>Nome completo</label>
              <input style={inp} type="text" required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Ex: Maria da Silva" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, color: '#424843' }}>E-mail</label>
              <input style={inp} type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@gmail.com" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, color: '#424843' }}>Senha inicial</label>
              <input style={inp} type="password" required minLength={8} value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} placeholder="Mínimo 8 caracteres" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, color: '#424843' }}>Perfil</label>
              <select style={inp} value={form.perfil} onChange={e => setForm({ ...form, perfil: e.target.value as 'admin' | 'editor' })}>
                <option value="editor">📝 Editor — edita conteúdo</option>
                <option value="admin">👑 Admin — acesso total</option>
              </select>
            </div>
          </div>

          {/* Explicação dos perfis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ background: '#f1eee4', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#424843' }}>
              <strong style={{ color: '#163526' }}>📝 Editor</strong><br />
              Pode criar e editar: notícias, produtos, escolas, galeria, depoimentos e edições.
              <strong style={{ color: '#ba1a1a' }}> Não pode</strong> criar ou deletar usuários.
            </div>
            <div style={{ background: '#fdf4e8', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#424843' }}>
              <strong style={{ color: '#96472b' }}>👑 Administrador</strong><br />
              Acesso total ao sistema, incluindo criar, editar e deletar usuários e configurações gerais.
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={criando} style={{ padding: '11px 28px' }}>
            {criando ? 'Criando...' : '➕ Criar Usuário'}
          </button>
        </form>
      </div>

      {/* Lista de usuários */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e6e2d8', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e6e2d8' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>
            👥 Usuários Cadastrados ({usuarios.length})
          </h2>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#727973' }}>Carregando...</div>
        ) : (
          <div className="table-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ background: '#f1eee4' }}>
                  {['Nome', 'E-mail', 'Perfil', 'Status', 'Ações'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#424843', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id} style={{ borderTop: '1px solid #e6e2d8' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: u.perfil === 'admin' ? '#163526' : '#e5a864', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'white', fontWeight: 700, flexShrink: 0 }}>
                          {u.nome?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{u.nome}</div>
                          {u.id === profile?.id && <div style={{ fontSize: 11, color: '#727973' }}>você</div>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#424843' }}>{u.email}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={u.perfil}
                        onChange={e => alterarPerfil(u.id, e.target.value as 'admin' | 'editor')}
                        disabled={u.id === profile?.id}
                        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e6e2d8', fontSize: 13, background: u.perfil === 'admin' ? '#163526' : '#e5a864', color: u.perfil === 'admin' ? 'white' : '#3a1a00', fontWeight: 700, cursor: u.id === profile?.id ? 'not-allowed' : 'pointer' }}
                      >
                        <option value="editor">📝 Editor</option>
                        <option value="admin">👑 Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 9999, fontSize: 11, fontWeight: 700, background: u.ativo ? '#c7ebd4' : '#ffdad6', color: u.ativo ? '#012113' : '#93000a' }}>
                        {u.ativo ? '● Ativo' : '○ Inativo'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => toggleAtivo(u.id, u.ativo)}
                          disabled={u.id === profile?.id}
                          style={{ padding: '6px 12px', borderRadius: 6, border: 'none', fontSize: 12, cursor: u.id === profile?.id ? 'not-allowed' : 'pointer', background: u.ativo ? '#727973' : '#96472b', color: 'white', opacity: u.id === profile?.id ? 0.4 : 1 }}
                          title={u.ativo ? 'Desativar' : 'Ativar'}
                        >
                          {u.ativo ? '🔒 Desativar' : '🔓 Ativar'}
                        </button>
                        <button
                          onClick={() => deletarUsuario(u.id, u.nome)}
                          disabled={u.id === profile?.id}
                          style={{ padding: '6px 10px', borderRadius: 6, border: 'none', fontSize: 12, cursor: u.id === profile?.id ? 'not-allowed' : 'pointer', background: '#ba1a1a', color: 'white', opacity: u.id === profile?.id ? 0.4 : 1 }}
                          title="Deletar usuário"
                        >
                          🗑️
                        </button>
                      </div>
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
