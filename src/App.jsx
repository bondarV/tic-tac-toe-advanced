import './App.css';
import {Route, Routes} from 'react-router-dom';
import {componentsPages} from './data/pagesMeta.js';
import {NavBar} from "@/components/layout/index.jsx";
import {Introduction} from "@/pages/Introduction/index.jsx";
import {Gameplay} from "@/pages/Gameplay/index.jsx";
import {NotFound} from "@/pages/NotFound/index.jsx";
import {UserProfile} from "@/pages/UserProfile/index.jsx";
import {Players} from "@/pages/Players/index.jsx";

function App() {
    return (
        <div className="app">
            <NavBar pages={componentsPages}/>
            <main>
                <Routes>
                    <Route path="/" element={<Introduction/>}/>
                    <Route path="/game" element={<Gameplay/>}/>
                    <Route path="/players" element={<Players/>}/>
                    <Route path="/profile/:id" element={<UserProfile/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;