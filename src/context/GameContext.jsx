import {createContext, useContext} from 'react';
import {useGameSettings} from '@/hooks/useGameSettings';

const GameContext = createContext(null);

export const GameProvider = ({children}) => {
    const {settings, saveSettings} = useGameSettings();

    return (
        <GameContext.Provider value={{settings, saveSettings}}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};