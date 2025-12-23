import {Link} from 'react-router-dom';
import {ListItem} from "../ListItem/ListItem.jsx";
import {useGame} from "@/context/GameContext";
import styles from "./DisplayList.module.css";

function DisplayList({items = []}) {
    const listItems = Array.isArray(items) ? items : Object.values(items);
    const {getAllPlayers} = useGame();
    const allPlayers = getAllPlayers();

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

            {allPlayers.length > 0 && (
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