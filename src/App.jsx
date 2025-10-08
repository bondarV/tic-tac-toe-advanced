import './App.css';
import { pages } from './utilities/pagesMeta';
import {NavBar} from "./components/layout/index.jsx";
import {IntroductionPage} from "./pages/IntroductionPage/IntroductionPage.jsx";

function App() {
  return (
    <>
        <NavBar pages={pages}/>
        <IntroductionPage/>
    </>
  );
}

export default App;
