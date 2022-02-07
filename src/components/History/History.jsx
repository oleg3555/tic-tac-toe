import React from "react";
import {StepButton} from "../Buttons/StepButton";
import styles from './History.module.css';

export function History({history, jumpTo}) {
    const moves = history.map((step, move) => {
        const clickHandler = () => {
            jumpTo(move)
        }
        return <StepButton key={move} onClick={clickHandler} value={move}/>
    });
    return (
        <div className={styles.history}>
            <div className={styles.history__title}>History</div>
            <div className={styles.history__moves}>
                {moves}
            </div>
        </div>
    )
}

