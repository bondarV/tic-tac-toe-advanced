import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTicTacToe} from '@/hooks/useTicTacToe.js';
import {useTimer} from '@/hooks/useTimer';
import {Button} from '@/components/ui';
import {Popup} from '@/components/common/Popup/Popup.jsx';
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
    const popupTone = gameState.status === GAME_STATUS.DRAW
        ? 'warning'
        : gameState.status === GAME_STATUS.TIME_UP
            ? 'danger'
            : 'success';


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

            <Popup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Гра завершена"
                subtitle={getWinnerText()}
                tone={popupTone}
                actions={[
                    {
                        label: 'Зіграти ще раз',
                        onClick: onRestart,
                        variant: 'primary'
                    },
                    {
                        label: 'Вийти в меню',
                        onClick: () => navigate('/'),
                        variant: 'secondary'
                    }
                ]}
            >
                <div className={styles.resultSummary}>
                    <div className={styles.resultStat}>
                        <span className={styles.resultLabel}>Час гри</span>
                        <span className={styles.resultValue}>{formatTime(seconds)}</span>
                    </div>
                    <div className={styles.resultStat}>
                        <span className={styles.resultLabel}>Розмір поля</span>
                        <span className={styles.resultValue}>{settings.gridSize}×{settings.gridSize}</span>
                    </div>
                    <div className={styles.resultStat}>
                        <span className={styles.resultLabel}>Статус</span>
                        <span className={styles.resultValue}>
                            {gameState.status === GAME_STATUS.DRAW ? 'Нічия' : gameState.status}
                        </span>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export {Gameplay};