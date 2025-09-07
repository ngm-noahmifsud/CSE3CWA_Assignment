import React from 'react'

//Components
import Header from '../components/Header'
import ToggleTheme from '../components/ToggleTheme'
import CodeEditor from '../components/CodeEditor'

const page = () => {
  return (
    <div>
      <Header title='Escape Room'/>
      <ToggleTheme />
      <CodeEditor />
    </div>
  )
}

export default page