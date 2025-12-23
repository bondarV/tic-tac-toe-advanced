import './App.css';
import {Route, Routes} from 'react-router-dom';
import {componentsPages} from './data/pagesMeta.js';
import {NavBar} from "@/components/layout/index.jsx";
import {Introduction} from "@/pages/Introduction/index.jsx";
import {Gameplay} from "@/pages/Gameplay/index.jsx";
import {NotFound} from "@/pages/NotFound/index.jsx";
import {GameProvider} from '@/context/GameContext';
import {UserProfile} from "@/pages/UserProfile/index.jsx";

function App() {
    return (
        <GameProvider>
            <NavBar pages={componentsPages}/>
            <Routes>
                <Route path="/" element={<Introduction/>}/>
                <Route path="/game" element={<Gameplay/>}/>
                <Route path="/profile/:id" element={<UserProfile/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </GameProvider>
    );
}

export default App;