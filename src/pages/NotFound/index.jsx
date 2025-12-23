import {Link} from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Упс! Сторінку не знайдено.</p>
            <Link to="/" className={styles.link}>Повернутися на головну</Link>
        </div>
    );
}