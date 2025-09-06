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
      <CodeEditor initialCode={`// Try this: console.log("2 + 2 =", 2 + 2);`} />
    </div>
  )
}

export default page