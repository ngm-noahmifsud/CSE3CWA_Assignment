'use client'
import type * as monaco from 'monaco-editor'

import { Editor } from '@monaco-editor/react'
import React, { useRef, useState } from 'react'
import CodeOutput from './CodeOutput'

export default function () {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [value, setValue] = useState<string>('')

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
    editorRef.current = editor
    editor.focus();
  }

  return (
    <div className='grid grid-cols-2 h-screen'>
      <Editor
        height="90vh"
        theme='vs-dark'
        defaultLanguage="javascript"
        defaultValue="//Type javascript here"
        onMount={onMount}
        value={value}
        onChange={(value?: string) => setValue(value ?? "")}
      />
      <CodeOutput editorRef={editorRef} />
    </div>
  )
}
