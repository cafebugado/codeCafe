import { X, FileCode, FileText, Braces } from 'lucide-react';
import { useProjectStore } from '@/stores/projectStore';
import { cn } from '@/lib/utils';

const getFileIcon = (name: string) => {
  if (name.endsWith('.html')) return <FileCode className="h-3.5 w-3.5 text-chart-1" />;
  if (name.endsWith('.css')) return <FileText className="h-3.5 w-3.5 text-accent" />;
  if (name.endsWith('.js') || name.endsWith('.jsx')) return <Braces className="h-3.5 w-3.5 text-chart-5" />;
  if (name.endsWith('.ts') || name.endsWith('.tsx')) return <Braces className="h-3.5 w-3.5 text-accent" />;
  return <FileText className="h-3.5 w-3.5 text-muted-foreground" />;
};

export function EditorTabs() {
  const { getCurrentProject, activeFileIndex, setActiveFile } = useProjectStore();
  const project = getCurrentProject();

  if (!project) return null;

  return (
    <div className="h-9 bg-sidebar flex items-end border-b border-sidebar-border overflow-x-auto">
      {project.files.map((file, index) => (
        <button
          key={file.name}
          onClick={() => setActiveFile(index)}
          className={cn(
            'h-8 px-3 flex items-center gap-2 text-sm border-t-2 transition-colors min-w-0',
            activeFileIndex === index
              ? 'bg-card border-t-primary text-foreground'
              : 'bg-sidebar border-t-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          )}
        >
          {getFileIcon(file.name)}
          <span className="truncate">{file.name}</span>
        </button>
      ))}
    </div>
  );
}
