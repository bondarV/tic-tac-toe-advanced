import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ListItem} from "../ListItem/ListItem.jsx";
import {selectHistory} from "@/store/slices/resultsSlice";
import styles from "./DisplayList.module.css";

function DisplayList({items = []}) {
    const listItems = Array.isArray(items) ? items : Object.values(items);

    const history = useSelector(selectHistory);
    const hasPlayers = history.length > 0;

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

            {hasPlayers && (
                <ListItem>
                    <Link to="/players" className={styles.linkItem} title="Профілі гравців">
                        Гравці
                    </Link>
                </ListItem>
            )}
        </ul>
    )
}

export {DisplayList}