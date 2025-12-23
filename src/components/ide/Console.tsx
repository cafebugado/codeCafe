import { useProjectStore } from '@/stores/projectStore';
import { Trash2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

const typeStyles = {
  log: 'text-muted-foreground',
  info: 'text-accent',
  warn: 'text-chart-5',
  error: 'text-destructive',
};

const typeIcons = {
  log: '›',
  info: 'ℹ',
  warn: '⚠',
  error: '✕',
};

export function Console() {
  const { consoleOutput, clearConsole } = useProjectStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  return (
    <div className="h-full flex flex-col bg-sidebar">
      <div className="h-8 flex items-center justify-between px-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Console</span>
          {consoleOutput.length > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
              {consoleOutput.length}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={clearConsole}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2 font-mono text-xs space-y-0.5"
      >
        {consoleOutput.length === 0 ? (
          <div className="text-muted-foreground/50 italic p-2">
            Console output will appear here...
          </div>
        ) : (
          consoleOutput.map((entry, index) => (
            <div
              key={`${entry.timestamp}-${index}`}
              className={cn(
                'flex items-start gap-2 px-2 py-1 rounded hover:bg-secondary/30',
                typeStyles[entry.type]
              )}
            >
              <span className="opacity-60 select-none">{typeIcons[entry.type]}</span>
              <span className="whitespace-pre-wrap break-all">{entry.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
