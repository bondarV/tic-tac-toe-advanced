import styles from './NavBar.module.css'
import {NavItem} from './NavItem/NavItem';
import {ListDisplay} from "../../form/index.jsx";

function NavBar({pages}) {
    return (
        <>
            <ListDisplay className={styles.nav}>
                {pages.map((page) => (
                    <NavItem  key={page.id} id={page.id} url={page.url} name={page.name}/>
                ))}
            </ListDisplay>
        </>
    );
}

export {NavBar};
