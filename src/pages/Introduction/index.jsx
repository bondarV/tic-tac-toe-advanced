import styles from './index.module.css'
import {GameSelection} from "./GameSelection/GameSelection.jsx";

function Introduction() {

    return (
        <>
            <div style={styles.IntroductionPage}>
                <GameSelection/>
            </div>
        </>
    )
}

export {Introduction};
