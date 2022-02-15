import React from "react";
import styles from './GameMenu.module.css';
import {MenuButton} from "../Buttons/MenuButton";
import {BUTTON_VALUES, COLORS} from "../../scripts/libraries";
import Settings from "../Settings/Settings";

export function GameMenu({startNewGame, enableBotMode, disableBotMode, resetScore, botMode,isGameStarted}) {
    return (
        <div className={styles.buttonGroup}>
            <MenuButton color={COLORS.green} text={isGameStarted?BUTTON_VALUES.resetGame:BUTTON_VALUES.newGame} onClick={startNewGame}/>
            <Settings enableBotMode={enableBotMode}
                      resetScore={resetScore}
                      botMode={botMode}
                      disableBotMode={disableBotMode}/>
        </div>
    )
}