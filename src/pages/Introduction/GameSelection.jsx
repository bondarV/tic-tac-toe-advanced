import {SelectableList} from "@/components/form/index.jsx";
import {GAME_MODES} from "@/data/gameModes.js";
import styles from "./GameSelection.module.css";
import {useSelection} from "@/hooks/useSelection.js";

export function GameSelection() {
    const {
        handleSelectionChange,
        getSelectedLabel
    } = useSelection();

    return (
        <div className={styles.gameSelection}>
            {/* Заголовок і список режимів тепер показуються одразу */}
            <div className={styles.selectionContent}>
                <h2>Оберіть режим: {getSelectedLabel()}</h2>
                <SelectableList
                    items={GAME_MODES.map(m => m.label)}
                    onChange={handleSelectionChange}
                />
            </div>
        </div>
    );
}