import { Coffee, Code2, Hash, FileText, Zap, Download, Save, Clock, FolderOpen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectStore, TemplateType } from '@/stores/projectStore';
import { formatDistanceToNow } from 'date-fns';

export function WelcomeScreen() {
  const { createProject, projects, setCurrentProject, deleteProject } = useProjectStore();

  const templateColors: Record<TemplateType, string> = {
    html: 'bg-orange-500',
    javascript: 'bg-yellow-500',
    markdown: 'bg-blue-500',
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-card">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
            <Coffee className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Bem-vindo ao Code Café
          </h1>
          <p className="text-lg text-muted-foreground">
            Seu playground de código. Teste ideias, aprenda fazendo, exporte quando pronto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-card border border-border">
            <Zap className="h-6 w-6 text-chart-5 mb-3 mx-auto" />
            <h3 className="font-medium mb-1 text-center">Preview Instantâneo</h3>
            <p className="text-sm text-muted-foreground text-center">Veja mudanças enquanto digita</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <Save className="h-6 w-6 text-accent mb-3 mx-auto" />
            <h3 className="font-medium mb-1 text-center">Auto-Save</h3>
            <p className="text-sm text-muted-foreground text-center">Seu trabalho é salvo localmente</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <Download className="h-6 w-6 text-chart-3 mb-3 mx-auto" />
            <h3 className="font-medium mb-1 text-center">Exportar</h3>
            <p className="text-sm text-muted-foreground text-center">Baixe seu projeto como zip</p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-4 text-center">Escolha um template para começar:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 px-6"
              onClick={() => createProject('HTML Project', 'html')}
            >
              <Code2 className="h-5 w-5" />
              HTML/CSS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 px-6"
              onClick={() => createProject('JavaScript Project', 'javascript')}
            >
              <Hash className="h-5 w-5" />
              JavaScript
            </Button>
            <Button
              size="lg"
              className="gap-2 px-6"
              onClick={() => createProject('Markdown Project', 'markdown')}
            >
              <FileText className="h-5 w-5" />
              Markdown
            </Button>
          </div>
        </div>

        {projects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Seus Projetos</h2>
            </div>
            <div className="grid gap-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setCurrentProject(project.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${templateColors[project.template]}`} />
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="capitalize">{project.template}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{formatDistanceToNow(project.updatedAt, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
