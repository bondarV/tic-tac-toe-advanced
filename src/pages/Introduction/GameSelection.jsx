import {useState} from "react";
import {Button} from "@/components/ui/index.jsx";
import {SelectableList} from "@/components/form/index.jsx";
import {GAME_MODES} from "@/data/gameModes.js";
import styles from "./GameSelection.module.css";

export function GameSelection() {
    const [showSelection, setShowSelection] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);

    // Helper to get label from selected ID
    const getSelectedLabel = () => {
        const mode = GAME_MODES.find(m => m.id === selectedMode);
        return mode ? mode.label : 'Not selected';
    };

    return (
        <div className={styles.gameSelection}>
            <Button
                label={showSelection ? 'Приховати вибір' : 'Перейти до вибору режиму гри'}
                onClick={() => setShowSelection(!showSelection)}
            />
            {showSelection && (
                <div className={styles.selectionContent}>
                    <h2>Your choice is: {getSelectedLabel()}</h2>
                    <SelectableList
                        items={GAME_MODES.map(m => m.label)} // Pass labels to list
                        onChange={(label) => {
                            const mode = GAME_MODES.find(m => m.label === label);
                            setSelectedMode(mode ? mode.id : null);
                        }}
                    />
                </div>
            )}
        </div>
    );
}