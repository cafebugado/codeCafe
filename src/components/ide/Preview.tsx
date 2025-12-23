import { useEffect, useRef, useState, useCallback } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { RefreshCw, Smartphone, Tablet, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { marked } from 'marked';

type DeviceSize = 'mobile' | 'tablet' | 'desktop';

const deviceSizes: Record<DeviceSize, { width: string; label: string }> = {
  mobile: { width: '375px', label: 'Mobile' },
  tablet: { width: '768px', label: 'Tablet' },
  desktop: { width: '100%', label: 'Desktop' },
};

export function Preview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { getCurrentProject, addConsoleOutput } = useProjectStore();
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const project = getCurrentProject();

  const generatePreviewContent = useCallback(() => {
    if (!project) return '';

    if (project.template === 'markdown') {
      const mdFiles = project.files.filter(f => f.name.endsWith('.md'));
      const content = mdFiles.map(f => marked(f.content)).join('<hr/>');
      
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fafafa;
    }
    h1, h2, h3, h4, h5, h6 { margin: 1.5rem 0 0.5rem; color: #111; }
    h1 { font-size: 2rem; border-bottom: 2px solid #e5e5e5; padding-bottom: 0.5rem; }
    h2 { font-size: 1.5rem; border-bottom: 1px solid #e5e5e5; padding-bottom: 0.3rem; }
    p { margin: 0.5rem 0; }
    code { 
      background: #f0f0f0; 
      padding: 0.2rem 0.4rem; 
      border-radius: 4px; 
      font-family: 'Fira Code', monospace;
      font-size: 0.9em;
    }
    pre { 
      background: #1a1a2e; 
      color: #e5e5e5;
      padding: 1rem; 
      border-radius: 8px; 
      overflow-x: auto;
      margin: 1rem 0;
    }
    pre code { 
      background: none; 
      padding: 0;
      color: inherit;
    }
    ul, ol { margin: 0.5rem 0; padding-left: 2rem; }
    li { margin: 0.25rem 0; }
    blockquote {
      border-left: 4px solid #667eea;
      margin: 1rem 0;
      padding: 0.5rem 1rem;
      background: #f0f0ff;
      color: #444;
    }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
    th { background: #f5f5f5; }
    hr { margin: 2rem 0; border: none; border-top: 1px solid #e5e5e5; }
    a { color: #667eea; }
    img { max-width: 100%; height: auto; }
    input[type="checkbox"] { margin-right: 0.5rem; }
  </style>
</head>
<body>${content}</body>
</html>`;
    }

    // HTML/CSS/JS templates
    const htmlFile = project.files.find(f => f.name === 'index.html');
    const cssFiles = project.files.filter(f => f.name.endsWith('.css'));
    const jsFiles = project.files.filter(f => f.name.endsWith('.js'));

    if (!htmlFile) {
      return '<html><body><p>Nenhum arquivo HTML encontrado.</p></body></html>';
    }

    let html = htmlFile.content;

    // Create console interceptor script
    const consoleScript = `
      <script>
        (function() {
          const originalConsole = { ...console };
          const sendMessage = (type, args) => {
            window.parent.postMessage({
              type: 'console',
              method: type,
              args: args.map(arg => {
                try {
                  if (typeof arg === 'object') {
                    return JSON.stringify(arg, null, 2);
                  }
                  return String(arg);
                } catch (e) {
                  return String(arg);
                }
              })
            }, '*');
          };
          
          console.log = (...args) => {
            originalConsole.log(...args);
            sendMessage('log', args);
          };
          console.warn = (...args) => {
            originalConsole.warn(...args);
            sendMessage('warn', args);
          };
          console.error = (...args) => {
            originalConsole.error(...args);
            sendMessage('error', args);
          };
          console.info = (...args) => {
            originalConsole.info(...args);
            sendMessage('info', args);
          };

          window.onerror = (message, source, lineno, colno, error) => {
            sendMessage('error', [\`Error: \${message} at line \${lineno}\`]);
            return false;
          };
        })();
      </script>
    `;

    // Inject console script at the beginning of body
    html = html.replace('<body>', '<body>' + consoleScript);

    // Inject CSS
    const allCss = cssFiles.map(f => f.content).join('\n');
    if (allCss) {
      // Remove external CSS links
      html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '');
      html = html.replace('</head>', `<style>${allCss}</style></head>`);
    }

    // Inject JS
    const allJs = jsFiles.map(f => f.content).join('\n');
    if (allJs) {
      // Remove external script tags
      html = html.replace(/<script[^>]*src=["'][^"']*["'][^>]*><\/script>/gi, '');
      html = html.replace('</body>', `<script>${allJs}</script></body>`);
    }

    return html;
  }, [project]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        const method = event.data.method as 'log' | 'warn' | 'error' | 'info';
        const message = event.data.args.join(' ');
        addConsoleOutput(method, message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addConsoleOutput]);

  // Debounced preview update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        const content = generatePreviewContent();
        iframeRef.current.srcdoc = content;
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [generatePreviewContent, refreshKey]);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background text-muted-foreground">
        Preview aparecerá aqui
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <div className="h-9 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-3 shrink-0">
        <span className="text-xs text-muted-foreground font-medium">Preview</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7', deviceSize === 'mobile' && 'bg-secondary')}
            onClick={() => setDeviceSize('mobile')}
          >
            <Smartphone className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7', deviceSize === 'tablet' && 'bg-secondary')}
            onClick={() => setDeviceSize('tablet')}
          >
            <Tablet className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7', deviceSize === 'desktop' && 'bg-secondary')}
            onClick={() => setDeviceSize('desktop')}
          >
            <Monitor className="h-3.5 w-3.5" />
          </Button>
          <div className="w-px h-4 bg-sidebar-border mx-1" />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setRefreshKey(k => k + 1)}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div 
        className={cn(
          "flex-1 overflow-auto",
          deviceSize === 'desktop' 
            ? "p-0" 
            : "flex items-start justify-center p-4 bg-muted/30"
        )}
      >
        <iframe
          ref={iframeRef}
          title="Preview"
          sandbox="allow-scripts allow-modals"
          className={cn(
            "bg-background",
            deviceSize === 'desktop' 
              ? "w-full h-full border-0" 
              : "border border-border rounded-md shadow-lg transition-all duration-300"
          )}
          style={deviceSize !== 'desktop' ? {
            width: deviceSizes[deviceSize].width,
            height: '667px',
            maxWidth: '100%',
          } : undefined}
        />
      </div>
    </div>
  );
}
