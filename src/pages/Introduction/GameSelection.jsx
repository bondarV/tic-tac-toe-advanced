import styles from './GameSelection.module.css'
import {SelectableList} from '@/components/form';
import {gameModes} from "@/data/gameModes.js";
import {Button} from "@/components/ui/index.jsx";

function GameSelection({choice, setChoice}) {
    return (
        <div className={styles.gameSelection}>
            <Button label={'Перейти до вибору режиму гри'}/>
            <h2>Your choice is: {choice}</h2>
            <SelectableList items={gameModes} onChange={setChoice}/>
        </div>

    );

}

export {GameSelection}