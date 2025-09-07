'use client'
import React, { useState } from 'react'

import type * as monaco from 'monaco-editor'

type CodeOutputProps = {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>
}

const CodeOutput : React.FC<CodeOutputProps> = ({ editorRef }) => {
  const [output, setOutput] = useState<string>('')
  
  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue() ?? ""
    if (!sourceCode) return;
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: sourceCode }),
      });
      if (!res.ok) {
        throw new Error("Failed to run code");
      }

      const data = await res.json();
      // piston puts stdout/stderr in `run.output`
      setOutput(data.run.output);
    } catch (error) {
      console.error(error);
      setOutput("Error running code");
    }
  }

  return (
    <div>
      <button onClick={runCode}>Run</button>
      <h1>Output</h1>
      <pre>{output}</pre>
    </div>
  )
}

export default CodeOutput