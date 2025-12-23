import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGame} from '@/context/GameContext';
import {Button} from '@/components/ui';
import styles from './Players.module.css';

export function Players() {
    const navigate = useNavigate();
    const {getAllPlayers, getPlayerStats} = useGame();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('wins'); // 'wins', 'games', 'winRate'

    const allPlayers = getAllPlayers();

    const playersWithStats = useMemo(() => {
        return allPlayers.map(playerName => ({
            name: playerName,
            stats: getPlayerStats(playerName)
        }));
    }, [allPlayers, getPlayerStats]);

    const filteredAndSortedPlayers = useMemo(() => {
        let result = [...playersWithStats];

        // Filter
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'wins':
                    if (b.stats.wins !== a.stats.wins) return b.stats.wins - a.stats.wins;
                    return b.stats.totalGames - a.stats.totalGames;
                case 'games':
                    return b.stats.totalGames - a.stats.totalGames;
                case 'winRate':
                    return parseFloat(b.stats.winRate) - parseFloat(a.stats.winRate);
                default:
                    return 0;
            }
        });

        return result;
    }, [playersWithStats, searchTerm, sortBy]);

    if (allPlayers.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1>Профілі гравців</h1>
                    <p className={styles.emptyMessage}>
                        Поки що немає жодного гравця. Зіграйте першу гру, щоб побачити статистику!
                    </p>
                    <Button label="На головну" onClick={() => navigate('/')}/>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Профілі гравців</h1>

                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Пошук гравця..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="wins">За перемогами</option>
                        <option value="games">За кількістю ігор</option>
                        <option value="winRate">За % перемог</option>
                    </select>
                </div>

                {filteredAndSortedPlayers.length === 0 ? (
                    <div className={styles.emptyMessage} style={{textAlign: 'center'}}>
                        Гравців не знайдено
                    </div>
                ) : (
                    <div className={styles.playersList}>
                        {filteredAndSortedPlayers.map((player) => (
                            <div
                                key={player.name}
                                className={styles.playerCard}
                                onClick={() => navigate(`/profile/${encodeURIComponent(player.name)}`)}
                            >
                                <div className={styles.playerAvatar}>👤</div>
                                <div className={styles.playerInfo}>
                                    <h3 className={styles.playerName}>{player.name}</h3>
                                    <div className={styles.playerStats}>
                                        <div className={styles.statBadge}>
                                            <span className={styles.statLabel}>Ігор:</span>
                                            <span className={styles.statValue}>{player.stats.totalGames}</span>
                                        </div>
                                        <div className={styles.statBadge}>
                                            <span className={styles.statLabel}>Перемог:</span>
                                            <span className={`${styles.statValue} ${styles.wins}`}>
                                                {player.stats.wins}
                                            </span>
                                        </div>
                                        <div className={styles.statBadge}>
                                            <span className={styles.statLabel}>Поразок:</span>
                                            <span className={`${styles.statValue} ${styles.losses}`}>
                                                {player.stats.losses}
                                            </span>
                                        </div>
                                        <div className={styles.statBadge}>
                                            <span className={styles.statLabel}>Win Rate:</span>
                                            <span className={styles.statValue}>{player.stats.winRate}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.viewProfile}>
                                    <span>→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.actions}>
                    <Button label="На головну" onClick={() => navigate('/')}/>
                </div>
            </div>
        </div>
    );
}
