import React from "react";
import styles from './GameMenu.module.css';
import {MenuButton} from "../Buttons/MenuButton";
import {BUTTON_VALUES, COLORS} from "../../scripts/libraries";

export function GameMenu({startNewGame,enableBotMode,disableBotMode}) {
    return (
        <div className={styles.buttonGroup}>
            <MenuButton color={COLORS.green} text={BUTTON_VALUES.newGame} onClick={startNewGame}/>
            <MenuButton color={COLORS.yellow} text={BUTTON_VALUES.vsBot} onClick={enableBotMode}/>
            <MenuButton color={COLORS.orange} text={BUTTON_VALUES.vsFriend} onClick={disableBotMode}/>
        </div>
    )
}