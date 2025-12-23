import Editor from '@monaco-editor/react';
import { useProjectStore } from '@/stores/projectStore';
import { useCallback } from 'react';

const getLanguage = (fileName: string): string => {
  if (fileName.endsWith('.html')) return 'html';
  if (fileName.endsWith('.css')) return 'css';
  if (fileName.endsWith('.js')) return 'javascript';
  if (fileName.endsWith('.jsx')) return 'javascript';
  if (fileName.endsWith('.ts')) return 'typescript';
  if (fileName.endsWith('.tsx')) return 'typescript';
  return 'plaintext';
};

export function CodeEditor() {
  const { getCurrentProject, activeFileIndex, updateFile } = useProjectStore();
  const project = getCurrentProject();

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined) {
        updateFile(activeFileIndex, value);
      }
    },
    [activeFileIndex, updateFile]
  );

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card text-muted-foreground">
        Select or create a project to start coding
      </div>
    );
  }

  const currentFile = project.files[activeFileIndex];
  if (!currentFile) return null;

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={getLanguage(currentFile.name)}
        value={currentFile.content}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 16,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'line',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          automaticLayout: true,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showVariables: true,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true,
          },
        }}
      />
    </div>
  );
}
