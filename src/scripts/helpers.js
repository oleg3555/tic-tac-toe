import {GAME_SYMBOLS} from "./libraries";

export function getHistory(state) {
    return state.history.slice(0, state.stepNumber + 1);
}

export function getSquares(history, step = history.length - 1) {
    return history[step].squares;
}

export function getStatus(winner, state) {
    const {
        history,
        stepNumber,
        xIsNext,
        isGameOver
    } = state;
    if (winner) {
        return `Winner is ${winner}`;
    }
    if (history.length - 1 === stepNumber && isGameOver) {
        return 'Draw';
    } else {
        return `Next move: ${xIsNext ? GAME_SYMBOLS.X : GAME_SYMBOLS.O}`
    }
}