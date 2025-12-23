import {DisplayList} from "../../form/lists/DisplayList/DisplayList.jsx";
import {useGame} from "@/context/GameContext";
import styles from './NavBar.module.css';

function NavBar({pages, changeActivePage}) {
    const {getAllPlayers} = useGame();
    

    return (
        <nav className={styles.navbar}>
            <div className={styles.mainNav}>
                <DisplayList changeActivePage={changeActivePage} items={pages}/>
            </div>

        </nav>
    );
}

export {NavBar};
