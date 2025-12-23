import {useEffect, useState} from 'react';
import {useTicTacToe} from '@/hooks/useTicTacToe.js';
import {useTimer} from '@/hooks/useTimer';
import {useGameSettings} from '@/hooks/useGameSettings';
import {Button} from '@/components/ui';
import {Modal} from '@/components/common/Modal/Modal.jsx';
import {GAME_STATUS} from '@/constants/game';
import styles from './Gameplay.module.css';

function Gameplay({onNavigate}) {
    const {settings} = useGameSettings();
    const {gameState, handleMove, resetGame, handleTimeUp} = useTicTacToe(settings.gridSize);
    const {seconds, start, stop, reset: resetTimer} = useTimer();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Перевірка таймера
    useEffect(() => {
        if (settings.timeLimit > 0 && seconds >= settings.timeLimit && gameState.status === GAME_STATUS.IN_PROGRESS) {
            handleTimeUp();
        }
    }, [seconds, settings.timeLimit, gameState.status, handleTimeUp]);

    // Скидання таймера при зміні ходу (тільки якщо є ліміт часу)
    useEffect(() => {
        if (settings.timeLimit > 0 && gameState.status === GAME_STATUS.IN_PROGRESS) {
            resetTimer();
            start();
        }
    }, [gameState.isXNext, settings.timeLimit, gameState.status, resetTimer, start]);

    // Зупиняємо таймер, коли гра завершується
    useEffect(() => {
        if (gameState.status !== GAME_STATUS.IN_PROGRESS) {
            stop();
            setIsModalOpen(true);
        }
    }, [gameState.status, stop]);

    const onCellClick = (index) => {
        // Запускаємо таймер при першому ході (якщо немає ліміту часу)
        if (settings.timeLimit === 0 && seconds === 0 && gameState.status === GAME_STATUS.IN_PROGRESS) {
            start();
        }
        handleMove(index);
    };

    const onRestart = () => {
        resetGame();
        resetTimer();
        setIsModalOpen(false);
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
                    onClick={() => onNavigate('start')}
                />
                <Button
                    label="Налаштування"
                    onClick={() => onNavigate('settings')}
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
                        <Button label="Налаштування" onClick={() => onNavigate('settings')}/>
                        <Button label="Вийти в меню" onClick={() => onNavigate('start')}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export {Gameplay};