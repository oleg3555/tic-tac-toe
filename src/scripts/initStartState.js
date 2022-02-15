export function initStartState() {
    return {
        history: [{
            squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
        botMode: false,
        isGameOver: false,
        isMoveBlocked: false,
        score: {
            winsX: 0,
            winsO: 0,
        }
    }
}