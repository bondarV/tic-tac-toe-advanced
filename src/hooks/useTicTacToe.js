import {useCallback, useState} from 'react';
import {GAME_STATUS, INITIAL_GAME_STATE, SYMBOLS} from '@/constants/game';
import {calculateWinner, isDraw} from '@/utils/calculateWinner';

export const useTicTacToe = () => {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

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
        setGameState(INITIAL_GAME_STATE);
    }, []);

    return {gameState, handleMove, resetGame};
};