import styles from './index.module.css'
import {GameSelection} from "./GameSelection.jsx";

export function Introduction() {

    return (
        <>
            <div className={styles.introductionPageContainer}>
                <GameSelection/>
            </div>
        </>
    )
}

