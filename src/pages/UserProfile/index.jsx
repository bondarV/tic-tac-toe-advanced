import {useNavigate, useParams} from 'react-router-dom';
import {Button} from '@/components/ui';
import styles from './UserProfile.module.css';

export function UserProfile() {
    const {id} = useParams(); // Отримуємо динамічний ID
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Профіль гравця</h1>
                <div className={styles.avatar}>👤</div>
                <p>ID: <strong>{id}</strong></p>
                <div className={styles.stats}>
                    <div><span>Перемоги:</span> <strong>10</strong></div>
                    <div><span>Поразки:</span> <strong>5</strong></div>
                </div>
                <Button label="На головну" onClick={() => navigate('/')}/>
            </div>
        </div>
    );
}