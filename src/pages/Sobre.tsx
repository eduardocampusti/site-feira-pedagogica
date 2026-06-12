export default function Sobre() {
  return (
    <main style={{ background: '#fdf9ef' }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <p className="section-label">NOSSA HISTÓRIA</p>
        <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 40 }}>
          Educação, Comunidade e Sustentabilidade
        </h1>

        <div style={{ maxWidth: 800, marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#163526', marginBottom: 16 }}>Missão</h2>
          <p style={{ fontSize: 18, color: '#424843', lineHeight: 1.8, marginBottom: 40 }}>
            Integrar educação formal com a realidade rural da Região Serrana, transformando o currículo escolar em ações práticas de sustentabilidade, empreendedorismo e valorização da agricultura familiar.
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#163526', marginBottom: 16 }}>Visão</h2>
          <p style={{ fontSize: 18, color: '#424843', lineHeight: 1.8, marginBottom: 40 }}>
            Uma região onde escolas, comunidade e produtores caminham juntos, cultivando conhecimento que transforma vidas e preserva o meio ambiente.
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#163526', marginBottom: 16 }}>Valores</h2>
          <ul style={{ fontSize: 18, color: '#424843', lineHeight: 1.8, paddingLeft: 24, listStyleType: 'none' }}>
            {['Educação de qualidade', 'Sustentabilidade', 'Valorização da cultura rural', 'Inclusão e equidade', 'Inovação pedagógica'].map(v => (
              <li key={v} style={{ marginBottom: 12 }}>🌱 {v}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#f1eee4', borderRadius: 16, padding: 40, marginTop: 60 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#163526', marginBottom: 20 }}>Objetivos Pedagógicos</h2>
          <ul style={{ fontSize: 16, color: '#424843', lineHeight: 1.8, listStyleType: 'none', paddingLeft: 0 }}>
            {[
              'Conectar aprendizado teórico com prática cotidiana',
              'Desenvolver consciência ambiental e sustentável',
              'Valorizar empreendedorismo e inovação local',
              'Fortalecer identidade e pertencimento à comunidade',
              'Promover segurança alimentar e bem-estar'
            ].map(obj => (
              <li key={obj} style={{ marginBottom: 16, paddingLeft: 28, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>✓</span> {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
