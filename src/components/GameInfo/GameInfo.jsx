import React from "react";
import styles from './GameInfo.module.css'
import {GAME_MODES, GAME_SYMBOLS} from "../../scripts/libraries";

export function GameInfo({status, botMode, score,resetScore}) {
    return (
        <div>
            <div className={styles.status}>{status}</div>
            <div className={styles.description}>{botMode ? GAME_MODES.vsBot : GAME_MODES.vsPlayer}</div>
            <div className={styles.score}>
                <div>{GAME_SYMBOLS.X}: {score.winsX}</div>
                <button className={styles.resetBtn} onClick={resetScore}>Reset score</button>
                <div>{GAME_SYMBOLS.O}: {score.winsO}</div>
            </div>
        </div>
    )
}
