import {createSlice} from '@reduxjs/toolkit';

const DEFAULT_SETTINGS = {
    playerX: 'Player X',
    playerO: 'Player O',
    timeLimit: 0,
    gridSize: 3,
};

const loadSettings = () => {
    try {
        const saved = localStorage.getItem('tic-tac-toe-settings');
        return saved ? {...DEFAULT_SETTINGS, ...JSON.parse(saved)} : DEFAULT_SETTINGS;
    } catch (e) {
        return DEFAULT_SETTINGS;
    }
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: loadSettings(),
    reducers: {
        updateSettings: (state, action) => {
            const newSettings = {...state, ...action.payload};
            localStorage.setItem('tic-tac-toe-settings', JSON.stringify(newSettings));
            return newSettings;
        }
    }
});

export const {updateSettings} = settingsSlice.actions;
export const selectSettings = (state) => state.settings;
export default settingsSlice.reducer;