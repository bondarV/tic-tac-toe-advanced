import {Button} from "@/components/ui/index.jsx";
import {SelectableList} from "@/components/form/index.jsx";
import {GAME_MODES} from "@/data/gameModes.js";
import styles from "./GameSelection.module.css";
import {useSelection} from "@/hooks/useSelection.js";

export function GameSelection() {
    const {
        showSelection,
        toggleSelection,
        handleSelectionChange,
        getSelectedLabel
    } = useSelection();

    return (
        <div className={styles.gameSelection}>
            <Button
                label={showSelection ? 'Приховати вибір' : 'Перейти до вибору режиму гри'}
                onClick={toggleSelection}
            />
            {showSelection && (
                <div className={styles.selectionContent}>
                    <h2>Your choice is: {getSelectedLabel()}</h2>
                    <SelectableList
                        items={GAME_MODES.map(m => m.label)}
                        onChange={handleSelectionChange}
                    />
                </div>
            )}
        </div>
    );
}
