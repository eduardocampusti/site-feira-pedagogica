import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Produto } from '../../types'

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    carregarProdutos()
  }, [])

  async function carregarProdutos() {
    const { data } = await supabase.from('produtos').select('*').order('created_at', { ascending: false })
    setProdutos((data as Produto[]) || [])
  }

  async function deletar(id: string) {
    if (!confirm('Deletar?')) return
    await supabase.from('produtos').delete().eq('id', id)
    carregarProdutos()
  }

  return (
    <div style={{ flex: 1, padding: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28 }}>Produtos</h1>
        <button onClick={() => navigate('/admin/produtos/novo')} className="btn-primary">🛒 Novo Produto</button>
      </div>

      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e6e2d8', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1eee4', borderBottom: '1px solid #e6e2d8' }}>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Nome</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Escola</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 600 }}>Categoria</th>
              <th style={{ padding: 16, textAlign: 'center', fontWeight: 600 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e6e2d8' }}>
                <td style={{ padding: 16 }}>{p.nome}</td>
                <td style={{ padding: 16, fontSize: 13, color: '#727973' }}>{p.escola}</td>
                <td style={{ padding: 16, fontSize: 13, color: '#727973' }}>{p.categoria}</td>
                <td style={{ padding: 16, textAlign: 'center', display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <button onClick={() => navigate(`/admin/produtos/${p.id}`)} style={{ padding: '6px 12px', background: '#163526', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => deletar(p.id)} style={{ padding: '6px 12px', background: '#ba1a1a', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
