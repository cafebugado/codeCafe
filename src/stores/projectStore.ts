import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TemplateType = 'html' | 'javascript' | 'markdown';

export interface ProjectFile {
  name: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  template: TemplateType;
  files: ProjectFile[];
  createdAt: number;
  updatedAt: number;
}

const defaultHtmlFiles: ProjectFile[] = [
  {
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Olá, Mundo!</h1>
    <p>Bem-vindo ao meu projeto HTML.</p>
  </div>
</body>
</html>`,
  },
  {
    name: 'styles.css',
    language: 'css',
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.container {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}`,
  },
];

const defaultJavaScriptFiles: ProjectFile[] = [
  {
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>JavaScript App</h1>
    <div class="counter">
      <button id="decrement">-</button>
      <span id="count">0</span>
      <button id="increment">+</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    name: 'styles.css',
    language: 'css',
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.container {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #e94560;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255,255,255,0.1);
  padding: 1.5rem 2rem;
  border-radius: 12px;
}

button {
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  background: #e94560;
  color: white;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

button:hover {
  transform: scale(1.1);
  background: #ff6b6b;
}

#count {
  font-size: 2.5rem;
  min-width: 60px;
  font-weight: bold;
}`,
  },
  {
    name: 'script.js',
    language: 'javascript',
    content: `// JavaScript Counter App
let count = 0;
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');

incrementBtn.addEventListener('click', () => {
  count++;
  render();
});

decrementBtn.addEventListener('click', () => {
  count--;
  render();
});

function render() {
  countElement.textContent = count;
}

console.log('🚀 App carregado!');`,
  },
];

const defaultMarkdownFiles: ProjectFile[] = [
  {
    name: 'README.md',
    language: 'markdown',
    content: `# Meu Projeto

## Introdução

Este é um projeto de exemplo usando **Markdown**.

## Recursos

- Fácil de escrever
- Formatação limpa
- Suporte a código

## Exemplo de Código

\`\`\`javascript
function hello() {
  console.log("Olá, Mundo!");
}
\`\`\`

## Lista de Tarefas

- [x] Criar projeto
- [ ] Adicionar conteúdo
- [ ] Publicar

## Links

[Documentação Markdown](https://www.markdownguide.org/)

---

*Criado com ❤️*`,
  },
  {
    name: 'notes.md',
    language: 'markdown',
    content: `# Notas

## Ideias

1. Primeira ideia
2. Segunda ideia
3. Terceira ideia

## Referências

> "A simplicidade é a sofisticação máxima." - Leonardo da Vinci

## Tabela

| Item | Descrição |
|------|-----------|
| A    | Primeiro  |
| B    | Segundo   |
| C    | Terceiro  |`,
  },
];

interface ProjectStore {
  projects: Project[];
  currentProjectId: string | null;
  activeFileIndex: number;
  consoleOutput: Array<{ type: 'log' | 'warn' | 'error' | 'info'; message: string; timestamp: number }>;
  
  createProject: (name: string, template: TemplateType) => string;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => string;
  renameProject: (id: string, name: string) => void;
  setCurrentProject: (id: string | null) => void;
  updateFile: (fileIndex: number, content: string) => void;
  setActiveFile: (index: number) => void;
  addFile: (name: string) => void;
  deleteFile: (fileIndex: number) => void;
  renameFile: (fileIndex: number, newName: string) => void;
  addFolder: (name: string) => void;
  addConsoleOutput: (type: 'log' | 'warn' | 'error' | 'info', message: string) => void;
  clearConsole: () => void;
  getCurrentProject: () => Project | null;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      activeFileIndex: 0,
      consoleOutput: [],

      createProject: (name, template) => {
        const id = crypto.randomUUID();
        let files: ProjectFile[];
        switch (template) {
          case 'html':
            files = [...defaultHtmlFiles];
            break;
          case 'javascript':
            files = [...defaultJavaScriptFiles];
            break;
          case 'markdown':
            files = [...defaultMarkdownFiles];
            break;
          default:
            files = [...defaultHtmlFiles];
        }
        const project: Project = {
          id,
          name,
          template,
          files: files.map(f => ({ ...f })),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set(state => ({
          projects: [project, ...state.projects],
          currentProjectId: id,
          activeFileIndex: 0,
        }));
        return id;
      },

      deleteProject: (id) => {
        set(state => ({
          projects: state.projects.filter(p => p.id !== id),
          currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
        }));
      },

      duplicateProject: (id) => {
        const project = get().projects.find(p => p.id === id);
        if (!project) return '';
        const newId = crypto.randomUUID();
        const newProject: Project = {
          ...project,
          id: newId,
          name: `${project.name} (copy)`,
          files: project.files.map(f => ({ ...f })),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set(state => ({
          projects: [newProject, ...state.projects],
          currentProjectId: newId,
          activeFileIndex: 0,
        }));
        return newId;
      },

      renameProject: (id, name) => {
        set(state => ({
          projects: state.projects.map(p =>
            p.id === id ? { ...p, name, updatedAt: Date.now() } : p
          ),
        }));
      },

      setCurrentProject: (id) => {
        set({ currentProjectId: id, activeFileIndex: 0, consoleOutput: [] });
      },

      updateFile: (fileIndex, content) => {
        set(state => {
          const project = state.projects.find(p => p.id === state.currentProjectId);
          if (!project) return state;
          const updatedFiles = project.files.map((f, i) =>
            i === fileIndex ? { ...f, content } : f
          );
          return {
            projects: state.projects.map(p =>
              p.id === state.currentProjectId
                ? { ...p, files: updatedFiles, updatedAt: Date.now() }
                : p
            ),
          };
        });
      },

      setActiveFile: (index) => {
        set({ activeFileIndex: index });
      },

      addFile: (name) => {
        const ext = name.split('.').pop()?.toLowerCase() || '';
        let language = 'plaintext';
        let content = '';
        
        if (ext === 'html') {
          language = 'html';
          content = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>';
        } else if (ext === 'css') {
          language = 'css';
          content = '/* Your styles here */\n';
        } else if (ext === 'js') {
          language = 'javascript';
          content = '// Your code here\n';
        } else if (ext === 'md') {
          language = 'markdown';
          content = '# Título\n\nConteúdo aqui...\n';
        } else if (ext === 'json') {
          language = 'json';
          content = '{\n  \n}';
        }

        set(state => {
          const project = state.projects.find(p => p.id === state.currentProjectId);
          if (!project) return state;
          
          const newFile: ProjectFile = { name, content, language };
          const updatedFiles = [...project.files, newFile];
          const newIndex = updatedFiles.length - 1;
          
          return {
            projects: state.projects.map(p =>
              p.id === state.currentProjectId
                ? { ...p, files: updatedFiles, updatedAt: Date.now() }
                : p
            ),
            activeFileIndex: newIndex,
          };
        });
      },

      deleteFile: (fileIndex) => {
        set(state => {
          const project = state.projects.find(p => p.id === state.currentProjectId);
          if (!project || project.files.length <= 1) return state;
          
          const updatedFiles = project.files.filter((_, i) => i !== fileIndex);
          const newActiveIndex = state.activeFileIndex >= updatedFiles.length 
            ? updatedFiles.length - 1 
            : state.activeFileIndex;
          
          return {
            projects: state.projects.map(p =>
              p.id === state.currentProjectId
                ? { ...p, files: updatedFiles, updatedAt: Date.now() }
                : p
            ),
            activeFileIndex: newActiveIndex,
          };
        });
      },

      renameFile: (fileIndex, newName) => {
        set(state => {
          const project = state.projects.find(p => p.id === state.currentProjectId);
          if (!project) return state;
          
          const ext = newName.split('.').pop()?.toLowerCase() || '';
          let language = 'plaintext';
          if (ext === 'html') language = 'html';
          else if (ext === 'css') language = 'css';
          else if (ext === 'js') language = 'javascript';
          else if (ext === 'md') language = 'markdown';
          else if (ext === 'json') language = 'json';
          
          const updatedFiles = project.files.map((f, i) =>
            i === fileIndex ? { ...f, name: newName, language } : f
          );
          
          return {
            projects: state.projects.map(p =>
              p.id === state.currentProjectId
                ? { ...p, files: updatedFiles, updatedAt: Date.now() }
                : p
            ),
          };
        });
      },

      addFolder: (name) => {
        // Add a placeholder file inside the folder
        set(state => {
          const project = state.projects.find(p => p.id === state.currentProjectId);
          if (!project) return state;
          
          const placeholderFile: ProjectFile = {
            name: `${name}/.gitkeep`,
            content: '',
            language: 'plaintext',
          };
          const updatedFiles = [...project.files, placeholderFile];
          
          return {
            projects: state.projects.map(p =>
              p.id === state.currentProjectId
                ? { ...p, files: updatedFiles, updatedAt: Date.now() }
                : p
            ),
          };
        });
      },

      addConsoleOutput: (type, message) => {
        set(state => ({
          consoleOutput: [
            ...state.consoleOutput.slice(-99),
            { type, message, timestamp: Date.now() },
          ],
        }));
      },

      clearConsole: () => {
        set({ consoleOutput: [] });
      },

      getCurrentProject: () => {
        const state = get();
        return state.projects.find(p => p.id === state.currentProjectId) || null;
      },
    }),
    {
      name: 'code-cafe-projects',
    }
  )
);
