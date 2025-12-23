import {useState} from 'react';

const DEFAULT_SETTINGS = {
    playerX: 'Player X',
    playerO: 'Player O',
    timeLimit: 0,
};

export const useGameSettings = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('tic-tac-toe-settings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    const saveSettings = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('tic-tac-toe-settings', JSON.stringify(newSettings));
    };

    return {settings, saveSettings};
};