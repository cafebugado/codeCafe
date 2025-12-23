import { useState } from 'react';
import { Header } from './Header';
import { FileExplorer } from './FileExplorer';
import { EditorTabs } from './EditorTabs';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { Console } from './Console';
import { ProjectList } from './ProjectList';
import { WelcomeScreen } from './WelcomeScreen';
import { useProjectStore } from '@/stores/projectStore';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export function IDE() {
  const [projectListOpen, setProjectListOpen] = useState(false);
  const { currentProjectId } = useProjectStore();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onOpenProjectList={() => setProjectListOpen(true)} />
      
      {!currentProjectId ? (
        <WelcomeScreen />
      ) : (
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Sidebar */}
          <ResizablePanel defaultSize={15} minSize={12} maxSize={25}>
            <div className="h-full bg-sidebar border-r border-sidebar-border">
              <div className="h-8 flex items-center px-3 border-b border-sidebar-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Explorer
                </span>
              </div>
              <FileExplorer />
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-px bg-sidebar-border" />

          {/* Editor + Preview */}
          <ResizablePanel defaultSize={85}>
            <ResizablePanelGroup direction="horizontal">
              {/* Editor */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={75} minSize={40}>
                    <div className="h-full flex flex-col bg-card">
                      <EditorTabs />
                      <CodeEditor />
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle className="h-px bg-sidebar-border" />
                  
                  <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
                    <Console />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>

              <ResizableHandle className="w-px bg-sidebar-border" />

              {/* Preview */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <Preview />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      <ProjectList open={projectListOpen} onOpenChange={setProjectListOpen} />
    </div>
  );
}
