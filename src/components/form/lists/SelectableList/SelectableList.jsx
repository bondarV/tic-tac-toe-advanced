import styles from './SelectableList.module.css'
import {Button} from "@/components/ui/index.jsx";

function SelectableList({className = '', items = [], onChange}) {
    const handleChange = (choice) => {
        onChange(choice);
    }
    return (
        <ul className={`${styles.gamesList} ${className}`}>
            {items.map((item, index) => (
                <li key={index}>
                    <Button onClick={() => handleChange(item)} label={item}/>
                </li>
            ))}
        </ul>
    );
}

export {SelectableList};