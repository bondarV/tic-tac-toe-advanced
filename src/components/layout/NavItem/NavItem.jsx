import styles from './NavItem.module.css'
import {ListItem} from "../../form/index.jsx";
function NavItem({name, url}) {
    // Guard against falsy urls (avoid rendering href="null" or href="undefined")
    return (
        <ListItem className={styles.navLink}>
            {url ? <a href={url}>{name}</a> : <span>{name}</span>}
        </ListItem>
    );
}

export {NavItem};
