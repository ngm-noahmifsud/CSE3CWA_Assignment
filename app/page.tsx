import Image from "next/image";


//Components
import Header from "./components/Header";
import CodeSnippet from "./components/CodeSnippet";
import ToggleTheme from "./components/ToggleTheme";

export default function Home() {
  return (
    <div>
      <Header title='Home'/>
      <ToggleTheme />
      <CodeSnippet code='type CodeSnippetProps = {code: string;language?: string;// e.g. "tsx", "js", "py"filename?: string;\n// optional labelwrap?: boolean;// set true to wrap long line};' language='tsx'/>
    </div>
  );
}
