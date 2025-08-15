import React from 'react'
import Header from '../components/Header'
import CodeSnippet from '../components/CodeSnippet'

const page = () => {
  return (
    <div>
        <Header title='About'/>
        <CodeSnippet code='type CodeSnippetProps = {code: string;language?: string;// e.g. "tsx", "js", "py"filename?: string;\n// optional labelwrap?: boolean;// set true to wrap long line};' language='tsx'/>
    </div>
  )
}

export default page