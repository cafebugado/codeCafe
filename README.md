# ☕ Code Café

> Uma IDE moderna no navegador para criar, editar e testar snippets de código HTML, CSS, JavaScript e Markdown em tempo real.

**Desenvolvido pela comunidade [Café Bugado](https://cafebugado.com.br)**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Screenshots](#-screenshots)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

**Code Café** é uma IDE (Integrated Development Environment) completa que roda diretamente no navegador, projetada para desenvolvedores que precisam criar e testar rapidamente snippets de código sem a necessidade de configurar um ambiente de desenvolvimento local.

### Por que Code Café?

- ⚡ **Rápido e Leve**: Inicialize projetos em segundos sem configurações complexas
- 🔄 **Preview em Tempo Real**: Veja suas alterações instantaneamente
- 💾 **Auto-Save**: Seus projetos são salvos automaticamente no navegador
- 📦 **Exportação Fácil**: Baixe seus projetos como arquivos ZIP
- 🎨 **Interface Moderna**: UI intuitiva e responsiva construída com shadcn/ui
- 🌙 **Suporte a Múltiplos Formatos**: HTML, CSS, JavaScript e Markdown

## ✨ Funcionalidades

### Editor de Código

- 🖊️ **Monaco Editor**: Editor de código completo (mesma engine do VS Code)
- 🎨 **Syntax Highlighting**: Destaque de sintaxe para HTML, CSS, JavaScript e Markdown
- 📝 **Auto-complete**: Sugestões inteligentes enquanto você digita
- 🔍 **Suporte Multi-arquivo**: Crie e gerencie múltiplos arquivos em cada projeto

### Gerenciamento de Projetos

- 📂 **Múltiplos Projetos**: Crie quantos projetos quiser
- 🏷️ **Templates Prontos**: Inicie com templates pré-configurados
  - HTML básico
  - JavaScript interativo (contador)
  - Markdown para documentação
- 📋 **Duplicar Projetos**: Clone projetos existentes rapidamente
- ✏️ **Renomear e Deletar**: Gerencie seus projetos facilmente

### Preview e Console

- 👁️ **Preview ao Vivo**: Visualização em tempo real do seu código
- 🐛 **Console Integrado**: Veja logs, warnings e erros
- 📱 **Responsivo**: Preview adaptável para diferentes tamanhos de tela
- 🔄 **Auto-refresh**: Atualização automática ao salvar

### Explorador de Arquivos

- 🗂️ **Árvore de Arquivos**: Navegue facilmente entre seus arquivos
- ➕ **Criar Arquivos**: Adicione novos arquivos HTML, CSS, JS ou MD
- 📁 **Criar Pastas**: Organize seus arquivos em diretórios
- 🏷️ **Renomear**: Renomeie arquivos com duplo clique
- 🗑️ **Deletar**: Remova arquivos desnecessários

### Exportação

- 📦 **Export para ZIP**: Baixe todo o projeto em um arquivo compactado
- 📄 **Estrutura Preservada**: Mantém a organização de arquivos e pastas
- 🚀 **Pronto para Deploy**: Código limpo e pronto para hospedagem

## 📸 Screenshots

<img width="1909" height="939" alt="image" src="https://github.com/user-attachments/assets/b1250436-cff3-4bd4-adde-276290431fa6" />


## 🛠️ Tecnologias

### Core

- **[React 18.3](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite 5.4](https://vitejs.dev/)** - Build tool ultrarrápido

### UI/UX

- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI reutilizáveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivas acessíveis para React
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e consistentes

### Editor

- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - Editor de código do VS Code
- **[Marked](https://marked.js.org/)** - Parser de Markdown

### Estado e Dados

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado leve
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de dados assíncronos

### Utilidades

- **[React Hook Form](https://react-hook-form.com/)** - Validação de formulários
- **[Zod](https://zod.dev/)** - Validação de schema TypeScript-first
- **[JSZip](https://stuk.github.io/jszip/)** - Criação de arquivos ZIP
- **[File Saver](https://github.com/eligrey/FileSaver.js/)** - Salvamento de arquivos no navegador
- **[date-fns](https://date-fns.org/)** - Manipulação de datas moderna

### Componentes Adicionais

- **[React Resizable Panels](https://github.com/bvaughn/react-resizable-panels)** - Painéis redimensionáveis
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrossel leve e personalizável

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js) ou **[pnpm](https://pnpm.io/)** / **[bun](https://bun.sh/)**

Para verificar se você tem o Node.js instalado:

```bash
node --version
npm --version
```

### Instalação do Node.js com nvm (Recomendado)

```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js
nvm install 18
nvm use 18
```

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/cafebugado/codeCafe.git
cd codeCafe
```

### 2. Instale as dependências

Escolha seu gerenciador de pacotes preferido:

```bash
# Usando npm
npm install

# Usando pnpm
pnpm install

# Usando bun
bun install
```

### 3. Inicie o servidor de desenvolvimento

```bash
# Usando npm
npm run dev

# Usando pnpm
pnpm dev

# Usando bun
bun dev
```

### 4. Acesse a aplicação

Abra seu navegador e acesse:

```
http://localhost:5173
```

## 💡 Como Usar

### Criar um Novo Projeto

1. Clique no botão **"+ Novo Projeto"** na tela inicial
2. Digite um nome para seu projeto
3. Escolha um template:
   - **HTML** - Projeto básico HTML + CSS
   - **JavaScript** - App interativo com JS
   - **Markdown** - Documentação em Markdown
4. Clique em "Criar"

### Editar Código

1. Use o explorador de arquivos à esquerda para navegar
2. Clique em um arquivo para abri-lo no editor
3. Digite seu código - as alterações são salvas automaticamente
4. Veja o preview ao vivo no painel direito

### Gerenciar Arquivos

- **Novo Arquivo**: Clique no botão ➕ no explorador
- **Renomear**: Duplo clique no nome do arquivo
- **Deletar**: Clique com botão direito → Deletar
- **Nova Pasta**: Clique no botão de pasta no explorador

### Exportar Projeto

1. Clique no botão **"Export"** no cabeçalho
2. Seu projeto será baixado como arquivo ZIP
3. Extraia o ZIP e abra o `index.html` no navegador

### Console de Debug

- O console mostra logs do seu código JavaScript
- Use `console.log()`, `console.warn()`, `console.error()` no código
- Clique em **"Limpar"** para limpar o console

## 📁 Estrutura do Projeto

```
code-cafe/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── ide/          # Componentes da IDE
│   │   │   ├── IDE.tsx           # Container principal
│   │   │   ├── CodeEditor.tsx    # Editor Monaco
│   │   │   ├── Preview.tsx       # Visualizador ao vivo
│   │   │   ├── Console.tsx       # Console de debug
│   │   │   ├── FileExplorer.tsx  # Explorador de arquivos
│   │   │   ├── EditorTabs.tsx    # Abas do editor
│   │   │   ├── Header.tsx        # Cabeçalho
│   │   │   ├── ProjectList.tsx   # Lista de projetos
│   │   │   └── WelcomeScreen.tsx # Tela inicial
│   │   ├── ui/           # Componentes shadcn/ui
│   │   └── NavLink.tsx   # Link de navegação
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilitários e helpers
│   ├── pages/            # Páginas da aplicação
│   │   ├── Index.tsx     # Página principal
│   │   └── NotFound.tsx  # Página 404
│   ├── stores/           # Estado global (Zustand)
│   │   └── projectStore.ts  # Store de projetos
│   ├── App.tsx           # Componente raiz
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais
├── index.html            # Template HTML
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── vite.config.ts        # Configuração Vite
├── tailwind.config.ts    # Configuração Tailwind
└── README.md            # Este arquivo
```

### Componentes Principais

#### IDE.tsx
Container principal que organiza todos os painéis usando `ResizablePanel`:
- Explorador de arquivos (sidebar esquerda)
- Editor de código e console (painel central)
- Preview ao vivo (painel direito)

#### CodeEditor.tsx
Editor de código baseado no Monaco Editor com:
- Syntax highlighting
- Auto-complete
- Multi-arquivo
- Detecção automática de linguagem

#### Preview.tsx
Renderizador de preview que suporta:
- HTML/CSS/JavaScript (iframe sandbox)
- Markdown (renderização com Marked)
- Captura de console.log via iframe

#### projectStore.ts
Store Zustand com persistência que gerencia:
- Lista de projetos
- Arquivos de cada projeto
- Estado do editor (arquivo ativo)
- Output do console

## 🎮 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento (http://localhost:5173)

# Build
npm run build        # Build de produção otimizado
npm run build:dev    # Build em modo desenvolvimento

# Preview
npm run preview      # Preview do build de produção

# Lint
npm run lint         # Executa ESLint para verificar código
```

### Build de Produção

O comando `npm run build` gera arquivos otimizados na pasta `dist/`:

```bash
npm run build
```

Arquivos gerados:
```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── index.html
```

## 🌐 Deploy

### Hospedagem Oficial

O Code Café está hospedado na **Vercel** e disponível em:

🌐 **[code.cafebugado.com.br](https://code.cafebugado.com.br)**

### Deploy na Vercel

Para fazer deploy do seu próprio fork na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cafebugado/codeCafe)

Ou via CLI:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras Opções de Deploy

#### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy Manual (Qualquer Host)

1. Build o projeto:
```bash
npm run build
```

2. Faça upload da pasta `dist/` para seu host:
   - GitHub Pages
   - Firebase Hosting
   - Cloudflare Pages
   - AWS S3 + CloudFront
   - Surge.sh

## 🔧 Configuração

### Personalizando Temas

Edite [tailwind.config.ts](tailwind.config.ts) para customizar cores:

```typescript
theme: {
  extend: {
    colors: {
      sidebar: "hsl(var(--sidebar))",
      // Adicione suas cores aqui
    }
  }
}
```

### Configurando Templates

Edite [src/stores/projectStore.ts](src/stores/projectStore.ts#L21-L252) para adicionar ou modificar templates:

```typescript
const defaultCustomTemplate: ProjectFile[] = [
  {
    name: 'index.html',
    language: 'html',
    content: '...'
  }
];
```

### Modificando Monaco Editor

Edite [src/components/ide/CodeEditor.tsx](src/components/ide/CodeEditor.tsx) para configurar:
- Temas do editor
- Opções de formatação
- Atalhos de teclado
- Extensões

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes

- Siga o estilo de código existente
- Adicione testes se aplicável
- Atualize a documentação
- Mantenha commits claros e descritivos

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/cafebugado/codeCafe/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se possível
- Informações do navegador/sistema

## 📝 Roadmap

- [ ] Suporte a TypeScript no editor
- [ ] Temas customizáveis (dark/light)
- [ ] Sincronização na nuvem (opcional)
- [ ] Colaboração em tempo real
- [ ] Integração com GitHub
- [ ] Mais templates (React, Vue, etc)
- [ ] Suporte a bibliotecas externas (CDN)
- [ ] Terminal integrado
- [ ] Atalhos de teclado customizáveis

## ❓ FAQ

**P: Os projetos são salvos onde?**
R: No `localStorage` do seu navegador. São dados locais e persistentes.

**P: Posso usar bibliotecas externas como jQuery?**
R: Sim! Adicione via CDN no HTML: `<script src="https://..."></script>`

**P: Suporta React/Vue?**
R: Atualmente não. É focado em HTML/CSS/JS puro e Markdown.

**P: Funciona offline?**
R: Após o primeiro carregamento, sim! É um PWA (Progressive Web App).

**P: Como compartilho meus projetos?**
R: Exporte como ZIP e envie, ou hospede o código exportado.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**[⬆ Voltar ao topo](#-code-café)**

Desenvolvido com ☕ e ❤️ pela comunidade **[Café Bugado](https://cafebugado.com.br)**

[🌐 Site](https://code.cafebugado.com.br) · [💻 GitHub](https://github.com/cafebugado/codeCafe) · [🐛 Reportar Bug](https://github.com/cafebugado/codeCafe/issues) · [👥 Comunidade](https://cafebugado.com.br)

</div>
