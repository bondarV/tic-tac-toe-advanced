import styles from './NavItem.module.css'
import {ListItem} from "../../../form/index.jsx";
function NavItem({name, url}) {
    return <ListItem className={styles.navLink}><a href={url}>{name}</a></ListItem>;
}

export {NavItem};
