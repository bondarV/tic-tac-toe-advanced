import {Link} from 'react-router-dom'; // Імпорт Link
import {ListItem} from "../ListItem/ListItem.jsx";
import styles from "./DisplayList.module.css";

function DisplayList({items = []}) {
    const listItems = Array.isArray(items) ? items : Object.values(items);

    return (
        <ul className={styles.displayList}>
            {listItems
                .filter(item => !item.hidden)
                .map(item => (
                    <ListItem key={item.id}>
                        <Link to={item.url} title={item.title} className={styles.linkItem}>
                            {item.title}
                        </Link>
                    </ListItem>
                ))}

            <ListItem>
                <Link to="/profile/player1" className={styles.linkItem}>
                    Мій Профіль
                </Link>
            </ListItem>
        </ul>
    )
}

export {DisplayList}