import {GAME_SYMBOLS} from "./libraries";
import {winLines} from "./calculate-winner";
const bestSquareIndex = 4;

function getWinIndex(squareArray, symbol) {
    for (let i = 0; i < winLines.length; i++) {
        if (!winLines[i].some((el) => squareArray[el] === symbol)) {
            const nextTurns = winLines[i].filter(el => {
                return squareArray[el] === null;
            })
            if (nextTurns.length === 1) {
                return nextTurns[0];
            }
        }
    }
    return null;
}

function getRandomIndex(squareArray) {
    if (!squareArray[bestSquareIndex]) {
        return bestSquareIndex;
    } else {
        return squareArray.indexOf(null);
    }

}

export function calculateBotMove(squaresArray) {
    return getWinIndex(squaresArray, GAME_SYMBOLS.X) || getWinIndex(squaresArray, GAME_SYMBOLS.O) || getRandomIndex(squaresArray);
}