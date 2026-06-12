import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome || !form.email || !form.mensagem) {
      alert('Preencha todos os campos')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('mensagens_contato').insert([form])
    setLoading(false)
    if (error) {
      alert('Erro ao enviar: ' + error.message)
    } else {
      setSucesso(true)
      setForm({ nome: '', email: '', mensagem: '' })
      setTimeout(() => setSucesso(false), 5000)
    }
  }

  return (
    <main style={{ background: '#fdf9ef', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: 600 }}>
        <p className="section-label">FALE CONOSCO</p>
        <h1 className="section-heading" style={{ marginBottom: 40 }}>Entre em Contato</h1>

        <div style={{ background: 'white', padding: 40, borderRadius: 16, border: '1px solid #e6e2d8', marginBottom: 40 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424843', marginBottom: 8 }}>
                Nome completo
              </label>
              <input type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} placeholder="Seu nome" style={{
                width: '100%', padding: '12px 16px',
                border: '1px solid #e6e2d8', borderBottom: '2px solid #163526',
                borderRadius: '8px 8px 0 0',
                background: '#fdf9ef', fontSize: 16, fontFamily: 'var(--font-body)', outline: 'none'
              }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424843', marginBottom: 8 }}>
                E-mail
              </label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="seu@email.com" style={{
                width: '100%', padding: '12px 16px',
                border: '1px solid #e6e2d8', borderBottom: '2px solid #163526',
                borderRadius: '8px 8px 0 0',
                background: '#fdf9ef', fontSize: 16, fontFamily: 'var(--font-body)', outline: 'none'
              }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424843', marginBottom: 8 }}>
                Mensagem
              </label>
              <textarea value={form.mensagem} onChange={e => setForm({...form, mensagem: e.target.value})} placeholder="Sua mensagem aqui..." style={{
                width: '100%', padding: '12px 16px', minHeight: 120,
                border: '1px solid #e6e2d8', borderRadius: 8,
                background: '#fdf9ef', fontSize: 16, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical'
              }} />
            </div>

            {sucesso && (
              <div style={{ background: '#c7ebd4', color: '#012113', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 500 }}>
                ✓ Mensagem enviada com sucesso! Obrigado pelo contato.
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16 }}>
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>

        <div style={{ background: '#f1eee4', padding: 40, borderRadius: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#163526', marginBottom: 20 }}>Informações de Contato</h2>
          <p style={{ fontSize: 16, color: '#424843', lineHeight: 1.8, marginBottom: 16 }}>
            <strong>Secretaria Municipal de Educação</strong><br />
            Brotas de Macaúbas, Bahia
          </p>
          <p style={{ fontSize: 16, color: '#424843', lineHeight: 1.8 }}>
            <strong>E-mail:</strong> seceducbrotasdemacaubas@gmail.com<br />
            <strong>Telefone:</strong> (73) 3269-1234
          </p>
        </div>
      </div>
    </main>
  )
}
