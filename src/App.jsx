import './App.css';
import {componentsPages} from './data/pagesMeta.js';
import {useState} from "react";
import {NavBar} from "@/components/layout/index.jsx";

function App() {
    const defaultPage = 'start';
    const [currentPage, setCurrentPage] = useState(defaultPage);

    const ActivePage = componentsPages[currentPage].component;
    return (
        <>
            {<NavBar pages={componentsPages} changeActivePage={setCurrentPage}/>}
            {<ActivePage onNavigate={setCurrentPage}/>}
        </>
    );
}

export default App;
