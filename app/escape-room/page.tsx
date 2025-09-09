'use client'
import React, { useState } from 'react'

//Components
import Header from '../components/Header'
import ToggleTheme from '../components/ToggleTheme'
import CodeEditor from '../components/CodeEditor'
import { CodeOutputContext } from './context'

const page = () => {
  const [output, setOutput] = useState('')

  return (
    <div>
      <CodeOutputContext.Provider value={{output, setOutput}}>
        <Header title='Escape Room'/>
        <p>{output}</p>
        <ToggleTheme />
        <CodeEditor />
      </CodeOutputContext.Provider>
    </div>
  )
}

export default page