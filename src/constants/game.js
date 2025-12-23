export const SYMBOLS = {
    X: 'X',
    O: 'O',
    EMPTY: null
};

export const GAME_STATUS = {
    IN_PROGRESS: 'IN_PROGRESS',
    WIN: 'WIN',
    DRAW: 'DRAW',
    TIME_UP: 'TIME_UP'
};

export const BOARD_SIZE = 9;

export const INITIAL_GAME_STATE = {
    board: Array(BOARD_SIZE).fill(SYMBOLS.EMPTY),
    isXNext: true,
    status: GAME_STATUS.IN_PROGRESS,
    winner: null,
    winningLine: null
};