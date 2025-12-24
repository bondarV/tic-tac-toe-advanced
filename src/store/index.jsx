import {configureStore} from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import resultsReducer from './slices/resultsSlice';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        results: resultsReducer,
    },
});