import {useCallback, useState} from 'react';
import {GAME_MODES} from '@/data/gameModes';

export const useSelection = () => {
    const [showSelection, setShowSelection] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);

    const toggleSelection = useCallback(() => {
        setShowSelection((prev) => !prev);
    }, []);

    const handleSelectionChange = useCallback((label) => {
        const mode = GAME_MODES.find((m) => m.label === label);
        setSelectedMode(mode ? mode.id : null);
    }, []);

    const getSelectedLabel = useCallback(() => {
        const mode = GAME_MODES.find((m) => m.id === selectedMode);
        return mode ? mode.label : 'Not selected';
    }, [selectedMode]);

    return {
        showSelection,
        toggleSelection,
        handleSelectionChange,
        getSelectedLabel,
        selectedMode
    };
};
