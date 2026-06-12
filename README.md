# 🌿 Feira Pedagógica da Região Serrana

> Portal oficial do projeto educacional que integra escolas, agricultura familiar e comunidade serrana.

## 🚀 Tecnologias

- **React 19** + **TypeScript**
- **Vite 8** (build)
- **Tailwind CSS 4**
- **Supabase** (banco de dados + autenticação + storage)
- **React Router 7**

## 📋 Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)

## ⚙️ Instalação local

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/feira-pedagogica.git
cd feira-pedagogica

# 2. Instale as dependências
npm install --include=dev

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

## 🏗️ Build para produção

```bash
npm run build
```
Os arquivos ficam em `dist/` — pronto para upload na Hostinger.

## 📁 Estrutura do projeto

```
src/
├── components/     # Header, Footer, ProtectedRoute
├── pages/          # Páginas públicas + admin
│   └── admin/      # Área administrativa
├── hooks/          # useEdicoes, useNoticias, useConfigSite...
├── lib/            # Cliente Supabase
└── types/          # Tipos TypeScript
```

## 🔐 Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pública anon do Supabase |

## 🌐 Deploy na Hostinger

1. Execute `npm run build`
2. Acesse o painel da Hostinger → File Manager
3. Faça upload de todo o conteúdo da pasta `dist/` para `public_html/`
4. Configure o redirecionamento para SPA (ver `.htaccess` incluído)

## 👤 Acesso administrativo

- URL: `/admin/login`
- Configure o usuário via Supabase → Authentication → Users

## 📄 Licença

Projeto desenvolvido para a Secretaria Municipal de Educação de Brotas de Macaúbas, Bahia.
