import {SYMBOLS} from '@/constants/game';

/**
 * @typedef {'X' | 'O' | null} GameSymbol
 */

/**
 * @typedef {Object} WinResult
 * @property {'X' | 'O'} winner
 * @property {number[]} line
 */

/**
 * Calculates the winner and winning line for a square Tic-Tac-Toe board.
 *
 * @param {GameSymbol[]} squares - Flat array that represents the board cells.
 * @returns {WinResult | null} Winning metadata or null when there is no winner.
 */
export function calculateWinner(squares) {
    if (!Array.isArray(squares) || squares.length === 0) {
        return null;
    }

    const size = Math.sqrt(squares.length);
    if (!Number.isInteger(size)) {
        return null;
    }

    const winningLine = buildWinningLines(size).find((line) => isWinningLine(squares, line));

    if (!winningLine) {
        return null;
    }

    return {
        winner: squares[winningLine[0]],
        line: winningLine
    };
}

/**
 * Builds every possible winning line for a square board.
 *
 * @param {number} size - Board side length.
 * @returns {number[][]} All row, column, and diagonal index combinations.
 */
function buildWinningLines(size) {
    const lines = [];

    for (let index = 0; index < size; index++) {
        lines.push(Array.from({length: size}, (_, offset) => index * size + offset));
        lines.push(Array.from({length: size}, (_, offset) => offset * size + index));
    }

    lines.push(Array.from({length: size}, (_, offset) => offset * (size + 1)));
    lines.push(Array.from({length: size}, (_, offset) => (offset + 1) * (size - 1)));

    return lines;
}

/**
 * Checks whether every square in a line belongs to the same player.
 *
 * @param {GameSymbol[]} squares - Flat array that represents the board cells.
 * @param {number[]} line - Indices for one candidate winning line.
 * @returns {boolean} True when the line is occupied by a single non-empty symbol.
 */
function isWinningLine(squares, line) {
    const firstSymbol = squares[line[0]];

    if (firstSymbol === SYMBOLS.EMPTY) {
        return false;
    }

    return line.every((index) => squares[index] === firstSymbol);
}

/**
 * Checks whether the board is full with no empty cells.
 *
 * @param {GameSymbol[]} squares - Flat array that represents the board cells.
 * @returns {boolean} True when all cells are filled.
 */
export function isDraw(squares) {
    return squares.every(square => square !== SYMBOLS.EMPTY);
}
