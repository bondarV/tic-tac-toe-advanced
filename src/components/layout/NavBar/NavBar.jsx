import {DisplayList} from "../../form/lists/DisplayList/DisplayList.jsx";
import styles from './NavBar.module.css';

function NavBar({pages, changeActivePage}) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.mainNav}>
                <DisplayList changeActivePage={changeActivePage} items={pages}/>
            </div>

        </nav>
    );
}

export {NavBar};
