import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTicTacToe} from '@/hooks/useTicTacToe.js';
import {useTimer} from '@/hooks/useTimer';
import {Button} from '@/components/ui';
import {Modal} from '@/components/common/Modal/Modal.jsx';
import {GAME_STATUS} from '@/constants/game';
import styles from './Gameplay.module.css';
import {addGameResult} from "@/store/slices/resultsSlice.js";
import {selectSettings} from "@/store/slices/settingsSlice.js";

function Gameplay() {
    const dispatch = useDispatch();
    const settings = useSelector(selectSettings);
    const navigate = useNavigate();
    const {gameState, handleMove, resetGame, handleTimeUp} = useTicTacToe(settings.gridSize);
    const {seconds, start, stop, reset: resetTimer} = useTimer();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isGameSavedRef = useRef(false);


    useEffect(() => {
        if (settings.timeLimit > 0 && seconds >= settings.timeLimit && gameState.status === GAME_STATUS.IN_PROGRESS) {
            handleTimeUp();
        }
    }, [seconds, settings.timeLimit, gameState.status, handleTimeUp]);


    useEffect(() => {
        if (settings.timeLimit > 0 && gameState.status === GAME_STATUS.IN_PROGRESS) {
            resetTimer();
            start();
            isGameSavedRef.current = false;
        }
    }, [gameState.isXNext, settings.timeLimit, gameState.status, resetTimer, start]);


    useEffect(() => {
        if (gameState.status !== GAME_STATUS.IN_PROGRESS) {
            stop();
            setIsModalOpen(true);

            if (!isGameSavedRef.current) {
                let winnerName = null;
                if (gameState.winner === 'X') winnerName = settings.playerX;
                if (gameState.winner === 'O') winnerName = settings.playerO;

                const gameResult = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    playerX: settings.playerX,
                    playerO: settings.playerO,
                    winner: winnerName,
                    status: gameState.status,
                    duration: seconds,
                    gridSize: settings.gridSize
                };

                dispatch(addGameResult(gameResult));
                isGameSavedRef.current = true;
            }
        }
    }, [gameState.status, stop, settings.playerX, settings.playerO, gameState.winner, seconds, dispatch, settings.gridSize]);


    const onCellClick = (index) => {
        if (settings.timeLimit === 0 && seconds === 0 && gameState.status === GAME_STATUS.IN_PROGRESS) {
            start();
            isGameSavedRef.current = false;
        }
        handleMove(index);
    };

    const onRestart = () => {
        resetGame();
        resetTimer();
        setIsModalOpen(false);
        isGameSavedRef.current = false;
    };

    const formatTime = (secs) => {
        const mins = Math.floor(secs / 60);
        const s = secs % 60;
        return `${mins}:${s < 10 ? '0' : ''}${s}`;
    };

    const getWinnerText = () => {
        if (gameState.status === GAME_STATUS.DRAW) return "Нічия!";
        if (gameState.status === GAME_STATUS.TIME_UP) {
            const winnerName = gameState.winner === 'X' ? settings.playerX : settings.playerO;
            return `Час вичерпано! Переможець: ${winnerName}!`;
        }
        const winnerName = gameState.winner === 'X' ? settings.playerX : settings.playerO;
        return `Переможець: ${winnerName}!`;
    };

    const timeDisplay = settings.timeLimit > 0
        ? Math.max(0, settings.timeLimit - seconds)
        : seconds;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Час: {formatTime(timeDisplay)}</div>
                <div>
                    Хід: {gameState.isXNext ? settings.playerX : settings.playerO} ({gameState.isXNext ? 'X' : 'O'})
                </div>
            </div>

            <div
                className={styles.board}
                style={{gridTemplateColumns: `repeat(${settings.gridSize}, 1fr)`}}
            >
                {gameState.board.map((cell, index) => {
                    const isWinningCell = gameState.winningLine?.includes(index);
                    return (
                        <button
                            key={index}
                            className={`${styles.cell} ${isWinningCell ? styles.winning : ''}`}
                            onClick={() => onCellClick(index)}
                            disabled={!!cell || gameState.status !== GAME_STATUS.IN_PROGRESS}
                        >
                            {cell}
                        </button>
                    );
                })}
            </div>

            <div className={styles.actions}>
                <Button
                    label="Почати знову"
                    onClick={onRestart}
                />
                <Button
                    label="В меню"
                    onClick={() => navigate('/')}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Гра завершена"
            >
                <div style={{textAlign: 'center'}}>
                    <h3>{getWinnerText()}</h3>
                    <p>Час гри: {formatTime(seconds)}</p>
                    <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        <Button label="Зіграти ще раз" onClick={onRestart}/>
                        <Button label="Вийти в меню" onClick={() => navigate('/')}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export {Gameplay};