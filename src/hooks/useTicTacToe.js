import {useCallback, useEffect, useState} from 'react';
import {GAME_STATUS, SYMBOLS} from '@/constants/game';
import {calculateWinner, isDraw} from '@/utils/calculateWinner';

export const useTicTacToe = (gridSize = 3) => {
    const createInitialState = useCallback((size) => ({
        board: Array(size * size).fill(SYMBOLS.EMPTY),
        isXNext: true,
        status: GAME_STATUS.IN_PROGRESS,
        winner: null,
        winningLine: null
    }), []);

    const [gameState, setGameState] = useState(() => createInitialState(gridSize));

    useEffect(() => {
        setGameState(createInitialState(gridSize));
    }, [gridSize, createInitialState]);

    const handleMove = useCallback((index) => {
        if (gameState.board[index] || gameState.status !== GAME_STATUS.IN_PROGRESS) {
            return;
        }

        const newBoard = [...gameState.board];
        newBoard[index] = gameState.isXNext ? SYMBOLS.X : SYMBOLS.O;

        const winResult = calculateWinner(newBoard);

        let newStatus = GAME_STATUS.IN_PROGRESS;
        let winner = null;
        let winningLine = null;

        if (winResult) {
            newStatus = GAME_STATUS.WIN;
            winner = winResult.winner;
            winningLine = winResult.line;
        } else if (isDraw(newBoard)) {
            newStatus = GAME_STATUS.DRAW;
        }

        setGameState({
            board: newBoard,
            isXNext: !gameState.isXNext,
            status: newStatus,
            winner,
            winningLine
        });
    }, [gameState]);

    const resetGame = useCallback(() => {
        setGameState(createInitialState(gridSize));
    }, [gridSize, createInitialState]);

    const handleTimeUp = useCallback(() => {
        if (gameState.status !== GAME_STATUS.IN_PROGRESS) return;

        setGameState(prev => ({
            ...prev,
            status: GAME_STATUS.TIME_UP,
            winner: prev.isXNext ? SYMBOLS.O : SYMBOLS.X
        }));
    }, [gameState.status]);

    return {gameState, handleMove, resetGame, handleTimeUp};
};