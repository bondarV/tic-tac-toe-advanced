import {SYMBOLS} from '@/constants/game';

export function calculateWinner(squares) {
    const size = Math.sqrt(squares.length);
    const lines = [];

    // Rows
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
        }
        lines.push(row);
    }

    for (let i = 0; i < size; i++) {
        const col = [];
        for (let j = 0; j < size; j++) {
            col.push(j * size + i);
        }
        lines.push(col);
    }

    const d1 = [];
    const d2 = [];
    for (let i = 0; i < size; i++) {
        d1.push(i * size + i);
        d2.push(i * size + (size - 1 - i));
    }
    lines.push(d1);
    lines.push(d2);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const first = squares[line[0]];
        if (!first) continue;

        if (line.every(index => squares[index] === first)) {
            return {winner: first, line: line};
        }
    }
    return null;
}

export function isDraw(squares) {
    return squares.every(square => square !== SYMBOLS.EMPTY);
}