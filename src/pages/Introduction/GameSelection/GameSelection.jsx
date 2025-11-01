import {Button} from "../../../components/ui/index.jsx";
import {gameModes} from "../../../utilities/data/gameModes.js";
import {ListItem} from "../../../components/form/index.jsx";
import {ListDisplay} from "../../../components/form/index.jsx";
import styles from './GameSelection.module.css'
import {useState} from "react";

function GameSelection() {

    const [choice, setChoice] = useState(gameModes[0]);
    const handleChange = (choice) =>{
        setChoice(choice);
    }
    return (
        <div className={styles.gameSelection}>
            <Button label={'Перейти до вибору режиму гри'}/>
            <h2>Your choice is: {choice}</h2>
            <ListDisplay>
                {gameModes.map((gameMode, index) => (
                    <ListItem className={styles.customBlock} key={index}><Button onClick={()=>handleChange(gameMode)} label={gameMode}/></ListItem>
                ))}
            </ListDisplay>

        </div>

    )

}

export {GameSelection}