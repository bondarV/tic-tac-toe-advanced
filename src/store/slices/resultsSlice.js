import {createSelector, createSlice} from '@reduxjs/toolkit';

const loadHistory = () => {
    try {
        const saved = localStorage.getItem('tic-tac-toe-history');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
};

const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        history: loadHistory()
    },
    reducers: {
        addGameResult: (state, action) => {
            const newGame = {
                ...action.payload,
                id: Date.now(),
                date: new Date().toISOString(),
            };
            state.history.unshift(newGame);

            localStorage.setItem('tic-tac-toe-history', JSON.stringify(state.history));
        }
    }
});

export const {addGameResult} = resultsSlice.actions;


export const selectHistory = (state) => state.results.history;

export const selectAllPlayers = createSelector(
    [selectHistory],
    (history) => {
        const playersSet = new Set();
        history.forEach(game => {
            playersSet.add(game.playerX);
            playersSet.add(game.playerO);
        });
        return Array.from(playersSet).sort();
    }
);

export const selectPlayerStats = (state, playerName) => {
    const history = state.results.history;
    const playerGames = history.filter(
        game => game.playerX === playerName || game.playerO === playerName
    );

    const wins = playerGames.filter(game => game.winner === playerName).length;

    const losses = playerGames.filter(game =>
        game.winner && game.winner !== playerName && game.winner !== 'draw'
    ).length;

    const draws = playerGames.filter(game => !game.winner || game.winner === 'draw').length;

    return {
        playerName,
        totalGames: playerGames.length,
        wins,
        losses,
        draws,
        winRate: playerGames.length > 0 ? ((wins / playerGames.length) * 100).toFixed(1) : 0,
        recentGames: playerGames.slice(0, 10)
    };
};

export default resultsSlice.reducer;