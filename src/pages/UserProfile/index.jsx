import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectPlayerStats} from '@/store/slices/resultsSlice';
import {Button} from '@/components/ui';
import styles from './UserProfile.module.css';

export function UserProfile() {
    const {id} = useParams();
    const navigate = useNavigate();

    const stats = useSelector(state => selectPlayerStats(state, id));

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Профіль гравця</h1>
                <div className={styles.avatar}>👤</div>
                <h2 style={{margin: '0 0 1rem 0', fontSize: '1.5rem'}}>{id}</h2>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Перемоги</span>
                        <span className={`${styles.statValue} ${styles.wins}`}>
                            {stats.wins}
                        </span>
                    </div>

                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Поразки</span>
                        <span className={`${styles.statValue} ${styles.losses}`}>
                            {stats.losses}
                        </span>
                    </div>

                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Нічиї</span>
                        <span className={`${styles.statValue} ${styles.draws}`}>
                            {stats.draws}
                        </span>
                    </div>

                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Win Rate</span>
                        <span className={`${styles.statValue} ${styles.winRate}`}>
                            {stats.winRate}%
                        </span>
                    </div>
                </div>

                <div className={styles.totalGames}>
                    Всього зіграно матчів: <strong>{stats.totalGames}</strong>
                </div>

                <div style={{marginTop: '2rem'}}>
                    <Button label="Гравці" onClick={() => navigate('/players')}/>
                </div>
            </div>
        </div>
    );
}