import './App.css';
import {pages} from './utilities/data/pagesMeta.js';
import {NavBar} from "./components/layout/index.jsx";
import {Introduction} from "./pages/Introduction/index.jsx";

function App() {
    return (
        <>
            <NavBar pages={pages}/>
            <Introduction/>
        </>
    );
}

export default App;
