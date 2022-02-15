export function getHistory(state) {
    return state.history.slice(0, state.stepNumber + 1);
}
export function getSquares(history){
    return history[history.length - 1].squares;
}