import {createContext, useContext, useEffect, useState} from 'react';
import {useGameSettings} from '@/hooks/useGameSettings';

const GameContext = createContext(null);

export const GameProvider = ({children}) => {
    const {settings, saveSettings} = useGameSettings();

    const [gameHistory, setGameHistory] = useState(() => {
        const saved = localStorage.getItem('tic-tac-toe-history');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tic-tac-toe-history', JSON.stringify(gameHistory));
    }, [gameHistory]);

    const addGameResult = (result) => {
        const newGame = {
            id: Date.now(),
            date: new Date().toISOString(),
            playerX: result.playerX,
            playerO: result.playerO,
            winner: result.winner,
            duration: result.duration,
            gridSize: result.gridSize
        };
        setGameHistory(prev => [newGame, ...prev]);
    };

    const getAllPlayers = () => {
        const playersSet = new Set();
        gameHistory.forEach(game => {
            playersSet.add(game.playerX);
            playersSet.add(game.playerO);
        });
        return Array.from(playersSet).sort();
    };

    const getPlayerStats = (playerName) => {
        const playerGames = gameHistory.filter(
            game => game.playerX === playerName || game.playerO === playerName
        );

        const wins = playerGames.filter(game => {
            // Перевіряємо, чи записане ім'я переможця збігається з ім'ям гравця
            return game.winner === playerName;
        }).length;

        const losses = playerGames.filter(game => {
            // Поразка: є переможець (не null/draw), і це не поточний гравець
            // Додаткова перевірка !== 'draw' на випадок, якщо ви зміните логіку збереження нічиїх
            return game.winner && game.winner !== playerName && game.winner !== 'draw';
        }).length;

        const draws = playerGames.filter(game => {
            // У вашому Gameplay нічия зберігається як null (або статус != WIN)
            // Тому перевіряємо на null або рядок 'draw' для надійності
            return !game.winner || game.winner === 'draw';
        }).length;

        return {
            playerName,
            totalGames: playerGames.length,
            wins,
            losses,
            draws,
            winRate: playerGames.length > 0 ? ((wins / playerGames.length) * 100).toFixed(1) : 0,
            recentGames: playerGames.slice(0, 10)
        };
    };

    return (
        <GameContext.Provider value={{
            settings,
            saveSettings,
            gameHistory,
            addGameResult,
            getAllPlayers,
            getPlayerStats
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};