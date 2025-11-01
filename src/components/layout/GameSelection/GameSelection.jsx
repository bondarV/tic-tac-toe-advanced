import {Button} from "../../ui/index.jsx";
import {gameModes} from "../../../utilities/data/gameModes.js";
import {ListItem} from "../../ui/ListItem/ListItem.jsx";
import {ListDisplay} from "../../ui/ListDisplay/ListDisplay.jsx";
import styles from  './GameSelection.module.css'
import {useState} from "react";

function GameSelection() {

    const [choice, setChoice] = useState(gameModes[0]);
    const handleChange = (change) =>{
        setChoice(change);
    }
    return (
        <div className={styles.gameSelection}>
            <Button label={'Перейти до вибору режиму гри'}/>
            <h2>Your choice is: {choice}</h2>
            <ListDisplay className="games-list">
                {gameModes.map((gameMode, index) => (
                    <ListItem className='custom-block' key={index}><Button onClick={()=>handleChange(gameMode)} label={gameMode}/></ListItem>
                ))}
            </ListDisplay>

        </div>

    )

}

export {GameSelection}