'use client'
import React, { useState, useContext } from 'react'
import { CodeOutputContext } from '../escape-room/context'

import type * as monaco from 'monaco-editor'

type CodeOutputProps = {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>;
}

const CodeOutput : React.FC<CodeOutputProps> = ({ editorRef }) => {
  const outputState = useContext(CodeOutputContext);
  
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
      outputState?.setOutput(data.run.output);
    } catch (error) {
      console.error(error);
      outputState?.setOutput("Error running code");
    }
  }

  return (
    <div>
      <button onClick={runCode}>Run</button>
      <h1>Output</h1>
      <pre>{outputState?.output}</pre>
    </div>
  )
}

export default CodeOutput