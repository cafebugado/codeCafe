import { useProjectStore } from '@/stores/projectStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Copy, FolderOpen, Coffee, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface ProjectListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectList({ open, onOpenChange }: ProjectListProps) {
  const { projects, setCurrentProject, deleteProject, duplicateProject, createProject } = useProjectStore();

  const handleOpen = (id: string) => {
    setCurrentProject(id);
    onOpenChange(false);
    toast.success('Project opened');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProject(id);
    toast.success('Project deleted');
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateProject(id);
    toast.success('Project duplicated');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-primary" />
            Your Projects
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    createProject('HTML Project', 'html');
                    onOpenChange(false);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  HTML/CSS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    createProject('JavaScript Project', 'javascript');
                    onOpenChange(false);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  JavaScript
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    createProject('Markdown Project', 'markdown');
                    onOpenChange(false);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Markdown
                </Button>
              </div>
            </div>
          ) : (
            projects.map(project => (
              <div
                key={project.id}
                onClick={() => handleOpen(project.id)}
                className="group flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 cursor-pointer transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{project.name}</span>
                    <span className="px-1.5 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      {project.template}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleDuplicate(project.id, e)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => handleDelete(project.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
