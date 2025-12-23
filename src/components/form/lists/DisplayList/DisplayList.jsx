import {ListItem} from "../ListItem/ListItem.jsx";
import styles from "./DisplayList.module.css";

function DisplayList({items = [], changeActivePage = null}) {
    return (
        <ul className={styles.displayList}>
            {Object.values(items)
                .filter(item => !item.hidden)
                .map(item => (
                    <ListItem key={item.id}>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                changeActivePage?.(item.id);
                            }}
                            href={item.url}
                            title={item.title}
                        >
                            {item.title}
                        </a>
                    </ListItem>
                ))}
        </ul>
    )
}

export {DisplayList}