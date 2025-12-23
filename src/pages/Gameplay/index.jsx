import {useEffect, useState} from 'react';
import {useTicTacToe} from '@/hooks/useTicTacToe.js';
import {useTimer} from '@/hooks/useTimer';
import {useGameSettings} from '@/hooks/useGameSettings';
import {Button} from '@/components/ui';
import {Modal} from '@/components/common/Modal/Modal.jsx';
import {GAME_STATUS} from '@/constants/game';
import styles from './Gameplay.module.css';

function Gameplay() {
    const {settings} = useGameSettings();
    const {gameState, handleMove, resetGame} = useTicTacToe();
    const {seconds, start, stop, reset: resetTimer} = useTimer();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Зупиняємо таймер, коли гра завершується
    useEffect(() => {
        if (gameState.status !== GAME_STATUS.IN_PROGRESS) {
            stop();
            setIsModalOpen(true);
        }
    }, [gameState.status, stop]);

    const onCellClick = (index) => {
        // Запускаємо таймер при першому ході
        if (seconds === 0 && gameState.status === GAME_STATUS.IN_PROGRESS) {
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
        const winnerName = gameState.winner === 'X' ? settings.playerX : settings.playerO;
        return `Переможець: ${winnerName}!`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Time: {formatTime(seconds)}</div>
                <div>
                    Хід: {gameState.isXNext ? settings.playerX : settings.playerO} ({gameState.isXNext ? 'X' : 'O'})
                </div>
            </div>

            <div className={styles.board}>
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

            <Button
                label="Restart Game"
                onClick={onRestart}
                className={styles.restartBtn}
            />

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
                        <Button label="Вийти в меню" onClick={() => window.location.href = '/'}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export {Gameplay};