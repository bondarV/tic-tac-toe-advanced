import './App.css';
import {pages} from './utilities/data/pagesMeta.js';
import {NavBar} from "./components/layout/index.jsx";
import {Index} from "./pages/Introduction/index.jsx";
import {ListDisplay} from "./components/ui/ListDisplay/ListDisplay.jsx";
import {Index} from "./pages/Stats/index.jsx";

function App() {
    return (
        <>
            <NavBar pages={pages}/>
            <Index/>
        </>
    );
}

export default App;
