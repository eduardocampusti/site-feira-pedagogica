import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useConfigSite } from '../../hooks/useConfigSite'

export default function AdminConfigs() {
  const { config, loading } = useConfigSite()
  const [form, setForm] = useState({
    nome_projeto: '',
    subtitulo: '',
    texto_apresentacao: '',
    email_contato: '',
    telefone: '',
    endereco: '',
    facebook: '',
    instagram: '',
    youtube: '',
    imagem_hero: '',
  })
  const [salvando, setSalvando] = useState(false)
  const [uploadando, setUploadando] = useState(false)
  const [dragAtivo, setDragAtivo] = useState(false)

  useEffect(() => {
    if (config) {
      setForm(config)
    }
  }, [config])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    const { error } = await supabase
      .from('config_site')
      .update(form)
      .eq('id', config?.id)
    setSalvando(false)
    if (!error) alert('✓ Configurações salvas com sucesso!')
    else alert('Erro ao salvar: ' + error.message)
  }

  async function handleUploadImagem(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('⚠️ Por favor, selecione uma imagem válida (JPG, PNG, WebP, etc)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('⚠️ Imagem muito grande. Máximo 5MB.')
      return
    }

    setUploadando(true)
    try {
      // Comprimir imagem antes de salvar
      const canvas = document.createElement('canvas')
      const img = new Image()
      
      await new Promise<void>((_resolve, reject) => {
        img.onload = () => {
          // Redimensionar se necessário
          let width = img.width
          let height = img.height
          const maxWidth = 1920
          const maxHeight = 640
          
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
          
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, width, height)
          
          // Converter para Base64 (qualidade 95% - máxima qualidade)
          canvas.toBlob((blob) => {
            const reader = new FileReader()
            reader.onload = () => {
              const dataUrl = reader.result as string
              
              // Salvar localmente
              localStorage.setItem('heroImage', dataUrl)
              localStorage.setItem('heroImageTime', new Date().toISOString())
              
              // Auto-preencher
              setForm({ ...form, imagem_hero: dataUrl })
              alert('✓ Imagem carregada com qualidade máxima! Clique em "Salvar Configurações".')
              setUploadando(false)
            }
            reader.readAsDataURL(blob!)
          }, 'image/jpeg', 0.95)
        }
        
        img.onerror = reject
        img.src = URL.createObjectURL(file)
      })
    } catch (erro: any) {
      alert('❌ Erro ao processar imagem: ' + erro.message)
      setUploadando(false)
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragAtivo(true)
  }

  function handleDragLeave() {
    setDragAtivo(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragAtivo(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleUploadImagem(files[0])
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleUploadImagem(files[0])
    }
  }

  if (loading) return <div style={{ flex: 1, padding: 40 }}>Carregando...</div>

  return (
    <div style={{ flex: 1, padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 32 }}>Configurações do Site</h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e6e2d8', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Nome do Projeto</label>
          <input type="text" value={form.nome_projeto} onChange={e => setForm({...form, nome_projeto: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Subtítulo (Hero)</label>
          <input type="text" value={form.subtitulo} onChange={e => setForm({...form, subtitulo: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>URL da Imagem Hero (Banner Principal)</label>
          <input type="url" value={form.imagem_hero} onChange={e => setForm({...form, imagem_hero: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, marginBottom: 12 }} />
          
          {/* Área de Drag & Drop */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: '2px dashed ' + (dragAtivo ? '#163526' : '#c2c8c1'),
              borderRadius: 8,
              padding: 32,
              textAlign: 'center',
              cursor: 'pointer',
              background: dragAtivo ? 'rgba(22, 53, 38, 0.05)' : 'rgba(245, 245, 245, 0.5)',
              transition: 'all 0.2s ease',
              marginBottom: 12
            }}
            onClick={() => document.getElementById('file-input-hero')?.click()}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>
              {uploadando ? '⏳ Enviando...' : '📤'}
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#163526', margin: '0 0 4px 0' }}>
              {uploadando ? 'Carregando imagem...' : 'Arraste uma imagem ou clique para selecionar'}
            </p>
            <p style={{ fontSize: 12, color: '#727973', margin: 0 }}>
              JPG, PNG, WebP (máx 5MB, mín 1920x640px recomendado)
            </p>
            <input
              id="file-input-hero"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploadando}
              style={{ display: 'none' }}
            />
          </div>

          {form.imagem_hero && (
            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e6e2d8', marginBottom: 12 }}>
              <img src={form.imagem_hero} alt="Preview Hero" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
            </div>
          )}
          <p style={{ fontSize: 12, color: '#727973' }}>💡 A imagem será exibida com overlay verde/terracota automático.</p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Texto de Apresentação</label>
          <textarea value={form.texto_apresentacao} onChange={e => setForm({...form, texto_apresentacao: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16, minHeight: 100 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>E-mail</label>
            <input type="email" value={form.email_contato} onChange={e => setForm({...form, email_contato: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Telefone</label>
            <input type="tel" value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Endereço</label>
          <input type="text" value={form.endereco} onChange={e => setForm({...form, endereco: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e6e2d8', borderRadius: 8, fontSize: 16 }} />
        </div>

        <div style={{ borderTop: '1px solid #e6e2d8', paddingTop: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>Redes Sociais</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Facebook</label>
              <input type="url" value={form.facebook} onChange={e => setForm({...form, facebook: e.target.value})} placeholder="https://facebook.com/..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Instagram</label>
              <input type="url" value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} placeholder="https://instagram.com/..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>YouTube</label>
              <input type="url" value={form.youtube} onChange={e => setForm({...form, youtube: e.target.value})} placeholder="https://youtube.com/..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #e6e2d8', borderRadius: 6, fontSize: 14 }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={salvando} className="btn-primary" style={{ padding: '12px 24px' }}>
            {salvando ? 'Salvando...' : '💾 Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  )
}
