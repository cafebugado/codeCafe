import { Coffee, Download, Plus, FolderOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useProjectStore, TemplateType } from '@/stores/projectStore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

interface HeaderProps {
  onOpenProjectList: () => void;
}

export function Header({ onOpenProjectList }: HeaderProps) {
  const { createProject, getCurrentProject, setCurrentProject } = useProjectStore();

  const handleNewProject = (template: TemplateType) => {
    const names: Record<TemplateType, string> = {
      html: 'HTML Project',
      javascript: 'JavaScript Project',
      markdown: 'Markdown Project',
    };
    createProject(names[template], template);
    toast.success(`Projeto ${template} criado`);
  };

  const handleDownload = async () => {
    const project = getCurrentProject();
    if (!project) return;

    const zip = new JSZip();
    
    project.files.forEach(file => {
      zip.file(file.name, file.content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${project.name}.zip`);
    toast.success('Project downloaded!');
  };

  const project = getCurrentProject();

  const handleGoHome = () => {
    setCurrentProject(null);
  };

  return (
    <header className="h-12 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button 
          onClick={handleGoHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          title="Go to home"
        >
          <Coffee className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Code Café</span>
        </button>
        {project && (
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-sidebar-border">
            <span className="text-sm text-muted-foreground">
              {project.name}
            </span>
            <span className="px-1.5 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
              {project.template}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleNewProject('html')}>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                HTML/CSS
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNewProject('javascript')}>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                JavaScript
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNewProject('markdown')}>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Markdown
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="gap-2" onClick={onOpenProjectList}>
          <FolderOpen className="h-4 w-4" />
          Projects
        </Button>

        {project && (
          <>
            <DropdownMenuSeparator className="h-6 w-px bg-sidebar-border mx-1" />
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
