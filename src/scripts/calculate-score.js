import {GAME_SYMBOLS} from "./libraries";

export function calculateScore(winner, winsX, winsO) {
    const updatedWinsX = winner === GAME_SYMBOLS.X ? winsX + 1 : winsX;
    const updatedWinsO = winner === GAME_SYMBOLS.O ? winsO + 1 : winsO;
    return {updatedWinsX, updatedWinsO};
}