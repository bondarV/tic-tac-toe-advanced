import styles from './SelectableList.module.css'
import {ListItem} from "@/components/form/lists/ListItem/ListItem.jsx";
import {Button} from "@/components/ui/index.jsx";

function SelectableList({className = '', itemName = '', items = [], onChange}) {
    const handleChange = (choice) => {
        onChange(choice);
    }
    return (
        <ul className={`${styles.gamesList} ${className}`}>
            {items.map((item, index) => (
                <ListItem className={itemName} key={index}><Button onClick={() => handleChange(item)}
                                                                   label={item}/></ListItem>
            ))}
        </ul>
    );
}

export {SelectableList};