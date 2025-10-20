'use client'
import React, { useState } from 'react'

//Components
import Header from '../components/Header'
import ToggleTheme from '../components/ToggleTheme'
import CodeEditor from '../components/CodeEditor'
import { CodeOutputContext } from './context'
import Timer from '../components/Timer'

const page = () => {
  const [output, setOutput] = useState('')
  const DESIRED_OUTPUT = 'Hello World'

  return (
    <div>
      <CodeOutputContext.Provider value={{output, setOutput}}>
        <Header title='Escape Room'/>
        <Timer />
        <p>{output}</p>
        <p>{output ? (output.trim() === DESIRED_OUTPUT ? 'passed' : 'failed') : ''}</p>
        <ToggleTheme />
        <CodeEditor />
      </CodeOutputContext.Provider>
    </div>
  )
}

export default page