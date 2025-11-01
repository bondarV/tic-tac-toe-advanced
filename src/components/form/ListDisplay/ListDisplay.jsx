import styles from './ListDisplay.module.css'

function ListDisplay({children}) {
    return (
        <ul className={`${styles.gamesList}`}>
            {children}
        </ul>
    );
}
export {ListDisplay};