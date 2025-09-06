import Image from "next/image";


//Components
import Header from "./components/Header";
import PageBuilder from "./components/PageBuilder";
import ToggleTheme from "./components/ToggleTheme";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header title='Home'/>
      <PageBuilder />
      <ToggleTheme />
      <Footer />
    </div>
  );
}
