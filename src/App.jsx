import './App.css';
import {componentsPages} from './data/pagesMeta.js';
import {NavBar} from "./components/layout/index.jsx";
import {useState} from "react";

function App() {
    const defaultPage = 'start';
    const [currentPage, setCurrentPage] = useState(defaultPage);

    const ActivePage = componentsPages[currentPage];

    return (
        <>
            <NavBar pages={Object.keys(componentsPages)}
                    changeActivePage={setCurrentPage}
            />
            {ActivePage}
        </>
    );
}

export default App;
