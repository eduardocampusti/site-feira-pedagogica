import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [senha, setSenha]       = useState('')
  const [erro, setErro]         = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate                = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setLoading(false)
    if (error) {
      setErro('E-mail ou senha incorretos.')
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#fdf9ef' }}>
      {/* Painel esquerdo — visual */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(160deg, #163526 0%, #2d4c3b 60%, #96472b 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 48, color: 'white',
      }} className="login-visual">
        <img src="/logo-feira.png" alt="Feira Livre Pedagógica" style={{ height: 100, marginBottom: 32, mixBlendMode: 'screen' }} />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'white', textAlign: 'center', marginBottom: 16 }}>
          Área Administrativa
        </h1>
        <p style={{ fontSize: 17, opacity: 0.85, textAlign: 'center', maxWidth: 360, lineHeight: 1.7 }}>
          Gerencie notícias, produtos, galerias e todos os conteúdos da Feira Pedagógica da Região Serrana.
        </p>
      </div>

      {/* Painel direito — formulário */}
      <div style={{
        width: '100%', maxWidth: 480,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '48px 64px',
      }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 8 }}>Entrar</h2>
        <p style={{ fontSize: 15, color: '#424843', marginBottom: 40 }}>
          Acesse o painel com suas credenciais.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424843', marginBottom: 8 }}>
              E-mail
            </label>
            <input
              type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{
                width: '100%', padding: '12px 16px',
                border: '1px solid #e6e2d8', borderBottom: '2px solid #163526',
                borderRadius: '8px 8px 0 0',
                background: '#fdf9ef', fontSize: 16,
                fontFamily: 'var(--font-body)', outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424843', marginBottom: 8 }}>
              Senha
            </label>
            <input
              type="password" required
              value={senha} onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 16px',
                border: '1px solid #e6e2d8', borderBottom: '2px solid #163526',
                borderRadius: '8px 8px 0 0',
                background: '#fdf9ef', fontSize: 16,
                fontFamily: 'var(--font-body)', outline: 'none',
              }}
            />
          </div>

          {erro && (
            <p style={{ color: '#ba1a1a', fontSize: 14, padding: '10px 14px', background: '#ffdad6', borderRadius: 8 }}>
              {erro}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ fontSize: 13, color: '#727973', marginTop: 24, textAlign: 'center' }}>
          Esqueceu sua senha? Entre em contato com o administrador do sistema.
        </p>
      </div>
    </div>
  )
}
