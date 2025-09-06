'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Load Monaco on the client only
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type Props = { initialCode?: string };

export default function CodeEditor({ initialCode = 'console.log("Hello from Monaco!")' }: Props) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event?.data?.type === 'RESULT') {
        setOutput((event.data.logs || []).join('\n'));
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  function runInSandbox() {
    // Prevent closing the injected script tag
    const escaped = (code || '').replace(/<\/script/gi, '<\\/script');
    const html = `
<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <script>
      (function () {
        const logs = [];
        const originalLog = console.log;
        console.log = function () { logs.push(Array.from(arguments).join(' ')); };
        try {
          ${escaped}
        } catch (e) {
          logs.push('Error: ' + (e && e.message ? e.message : e));
        } finally {
          console.log = originalLog;
          parent.postMessage({ type: 'RESULT', logs }, '*');
        }
      })();
    </script>
  </body>
</html>`;
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, height: '70vh' }}>
      <div style={{ border: '1px solid #333', borderRadius: 8, overflow: 'hidden' }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
        />
      </div>

      <div>
        - <button onClick={runInSandbox} style={{ padding: '8px 12px', cursor: 'pointer' }}>Run</button>
        <pre style={{
          background: '#0b0b0c',
          color: '#d0d0d0',
          padding: 12,
          minHeight: 200,
          marginTop: 8,
          borderRadius: 8,
          overflow: 'auto'
        }}>
{output || 'Output will appear here...'}
        </pre>
        <iframe ref={iframeRef} sandbox="allow-scripts" style={{ display: 'none' }} />
      </div>
    </div>
  );
}
