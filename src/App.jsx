import './App.css';
import { pages } from './utilities/data/pagesMeta.js';
import {NavBar} from "./components/layout/index.jsx";
import {IntroductionPage} from "./pages/IntroductionPage/IntroductionPage.jsx";
import {ListDisplay} from "./components/ui/ListDisplay/ListDisplay.jsx";

function App() {
  return (
    <>
        <NavBar  pages={pages}/>
        <IntroductionPage/>
    </>
  );
}

export default App;
