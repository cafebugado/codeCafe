import { FileCode, FileText, Braces, ChevronRight, ChevronDown, Plus, Trash2, X, Pencil, FolderPlus, Folder } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getFileIcon = (name: string) => {
  if (name.endsWith('.html')) return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M4 3l1.778 17.09L12 22l6.222-1.91L20 3H4z" fill="#E34F26"/>
      <path d="M12 4.5v15l4.667-1.432L18 4.5H12z" fill="#EF652A"/>
      <path d="M8.5 8h7l-.2 2H8.7l.2 2h5.7l-.4 4.5L12 17.5l-2.2-.7L9.6 14H8l.4 4.5 3.6 1.2 3.6-1.2.5-6.5H8.3L8.5 8z" fill="#fff"/>
    </svg>
  );
  if (name.endsWith('.css')) return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M4 3l1.778 17.09L12 22l6.222-1.91L20 3H4z" fill="#1572B6"/>
      <path d="M12 4.5v15l4.667-1.432L18 4.5H12z" fill="#33A9DC"/>
      <path d="M8.5 8h7l-.2 2H8.7l.2 2h5.7l-.4 4.5L12 17.5l-2.2-.7L9.6 14H8l.4 4.5 3.6 1.2 3.6-1.2.5-6.5H8.3L8.5 8z" fill="#fff"/>
    </svg>
  );
  if (name.endsWith('.js')) return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E"/>
      <path d="M13.5 17.5c.3.5.8.9 1.6.9.7 0 1.1-.3 1.1-.8 0-.5-.4-.7-1.1-1l-.4-.2c-1.1-.5-1.8-1-1.8-2.3 0-1.1.9-2 2.2-2 1 0 1.7.3 2.2 1.2l-1.2.8c-.3-.5-.6-.7-1-.7-.5 0-.7.3-.7.6 0 .4.3.6.9.9l.4.2c1.3.5 2 1.1 2 2.4 0 1.4-1.1 2.1-2.5 2.1-1.4 0-2.3-.7-2.8-1.5l1.1-.6zM7 17.7c.2.4.4.7.9.7.5 0 .8-.2.8-.9v-5h1.5v5c0 1.5-.9 2.2-2.2 2.2-1.2 0-1.9-.6-2.2-1.3l1.2-.7z" fill="#000"/>
    </svg>
  );
  if (name.endsWith('.md')) return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#083FA1"/>
      <path d="M5 8v8h2v-4l1.5 2 1.5-2v4h2V8H10l-1.5 3L7 8H5zm10 0v8h2v-3l2 3h2.5l-2.5-4 2.5-4H17l-2 3V8h-2z" fill="#fff"/>
    </svg>
  );
  if (name.endsWith('.json')) return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#5A5A5A"/>
      <path d="M8 7c-1 0-2 .5-2 2v2c0 .5-.5 1-1 1 .5 0 1 .5 1 1v2c0 1.5 1 2 2 2m8-10c1 0 2 .5 2 2v2c0 .5.5 1 1 1-.5 0-1 .5-1 1v2c0 1.5-1 2-2 2" stroke="#F5DD1E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return <FileText className="h-4 w-4 text-muted-foreground" />;
};

interface FileNode {
  name: string;
  fullPath: string;
  isFolder: boolean;
  children?: FileNode[];
  fileIndex?: number;
}

function buildFileTree(files: { name: string }[]): FileNode[] {
  const root: FileNode[] = [];
  
  files.forEach((file, index) => {
    const parts = file.name.split('/');
    let currentLevel = root;
    
    parts.forEach((part, partIndex) => {
      const isLastPart = partIndex === parts.length - 1;
      const fullPath = parts.slice(0, partIndex + 1).join('/');
      
      let existing = currentLevel.find(n => n.name === part && n.isFolder === !isLastPart);
      
      if (!existing) {
        const newNode: FileNode = {
          name: part,
          fullPath,
          isFolder: !isLastPart,
          fileIndex: isLastPart ? index : undefined,
          children: !isLastPart ? [] : undefined,
        };
        currentLevel.push(newNode);
        existing = newNode;
      }
      
      if (!isLastPart && existing.children) {
        currentLevel = existing.children;
      }
    });
  });
  
  // Sort: folders first, then files, alphabetically
  const sortNodes = (nodes: FileNode[]): FileNode[] => {
    return nodes.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    }).map(node => ({
      ...node,
      children: node.children ? sortNodes(node.children) : undefined,
    }));
  };
  
  return sortNodes(root);
}

interface FileTreeItemProps {
  node: FileNode;
  depth: number;
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onDeleteFile: (index: number) => void;
  onRenameFile: (index: number, newName: string) => void;
  totalFiles: number;
}

function FileTreeItem({ node, depth, activeFileIndex, onSelectFile, onDeleteFile, onRenameFile, totalFiles }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  const handleRename = () => {
    if (renameValue.trim() && renameValue !== node.name && node.fileIndex !== undefined) {
      // Preserve folder path when renaming
      const pathParts = node.fullPath.split('/');
      pathParts[pathParts.length - 1] = renameValue.trim();
      const newFullPath = pathParts.join('/');
      onRenameFile(node.fileIndex, newFullPath);
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setRenameValue(node.name);
    }
  };

  if (node.isFolder) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-1 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 shrink-0" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0" />
          )}
          <Folder className="h-4 w-4 text-chart-5 shrink-0" />
          <span className="truncate">{node.name}</span>
        </button>
        {isExpanded && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem
                key={child.fullPath}
                node={child}
                depth={depth + 1}
                activeFileIndex={activeFileIndex}
                onSelectFile={onSelectFile}
                onDeleteFile={onDeleteFile}
                onRenameFile={onRenameFile}
                totalFiles={totalFiles}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Skip .gitkeep files in display
  if (node.name === '.gitkeep') {
    return null;
  }

  return (
    <div
      className={cn(
        'group w-full flex items-center gap-2 py-1.5 text-sm transition-colors cursor-pointer',
        node.fileIndex === activeFileIndex
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
      )}
      style={{ paddingLeft: `${depth * 12 + 16}px`, paddingRight: '8px' }}
      onClick={() => node.fileIndex !== undefined && onSelectFile(node.fileIndex)}
      onDoubleClick={() => {
        setIsRenaming(true);
        setRenameValue(node.name);
      }}
    >
      {getFileIcon(node.name)}
      {isRenaming ? (
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleRename}
          className="h-5 text-xs flex-1"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="flex-1 text-left truncate">{node.name}</span>
      )}
      {!isRenaming && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
              setRenameValue(node.name);
            }}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          {totalFiles > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation();
                if (node.fileIndex !== undefined) onDeleteFile(node.fileIndex);
              }}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function FileExplorer() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');
  const { getCurrentProject, activeFileIndex, setActiveFile, addFile, deleteFile, renameFile, addFolder, renameProject } = useProjectStore();
  const project = getCurrentProject();
  const [isRenamingProject, setIsRenamingProject] = useState(false);
  const [projectNameValue, setProjectNameValue] = useState('');

  const fileTree = useMemo(() => {
    if (!project) return [];
    return buildFileTree(project.files);
  }, [project?.files]);

  if (!project) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        No project selected
      </div>
    );
  }

  const handleCreate = () => {
    if (newName.trim()) {
      if (isCreating === 'file') {
        const exists = project.files.some(f => f.name === newName.trim());
        if (!exists) {
          addFile(newName.trim());
        }
      } else if (isCreating === 'folder') {
        addFolder(newName.trim());
      }
      setNewName('');
      setIsCreating(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      setIsCreating(null);
      setNewName('');
    }
  };

  const handleProjectRename = () => {
    if (projectNameValue.trim() && projectNameValue !== project.name) {
      renameProject(project.id, projectNameValue.trim());
    }
    setIsRenamingProject(false);
  };

  const handleProjectKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleProjectRename();
    } else if (e.key === 'Escape') {
      setIsRenamingProject(false);
      setProjectNameValue(project.name);
    }
  };

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 py-1 text-xs font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors flex-1 min-w-0"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 shrink-0" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0" />
          )}
          {isRenamingProject ? (
            <Input
              value={projectNameValue}
              onChange={(e) => setProjectNameValue(e.target.value)}
              onKeyDown={handleProjectKeyDown}
              onBlur={handleProjectRename}
              className="h-5 text-xs"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span 
              className="uppercase tracking-wider truncate"
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsRenamingProject(true);
                setProjectNameValue(project.name);
              }}
            >
              {project.name}
            </span>
          )}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 shrink-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsCreating('file')}>
              <FileText className="h-4 w-4 mr-2" />
              New File
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsCreating('folder')}>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isExpanded && (
        <div className="mt-1">
          {isCreating && (
            <div className="flex items-center gap-1 px-4 py-1">
              {isCreating === 'folder' && <Folder className="h-4 w-4 text-chart-5 shrink-0" />}
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isCreating === 'file' ? 'filename.js' : 'folder-name'}
                className="h-6 text-xs"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 shrink-0"
                onClick={() => {
                  setIsCreating(null);
                  setNewName('');
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {fileTree.map((node) => (
            <FileTreeItem
              key={node.fullPath}
              node={node}
              depth={0}
              activeFileIndex={activeFileIndex}
              onSelectFile={setActiveFile}
              onDeleteFile={deleteFile}
              onRenameFile={renameFile}
              totalFiles={project.files.filter(f => !f.name.endsWith('.gitkeep')).length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
