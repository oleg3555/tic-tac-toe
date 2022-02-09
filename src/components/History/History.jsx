import React from "react";
import {StepButton} from "../Buttons/StepButton";
import styles from './History.module.css';

export function History({jumpTo}) {
    const jumpBack = () => {
        jumpTo(false)
    }
    const jumpNext = () => {
        jumpTo(true)
    }
    return (
        <div className={styles.history}>
            <div className={styles.history__title}>History</div>
            <div className={styles.history__moves}>
                <StepButton onClick={jumpBack} value='back'/>
                <StepButton onClick={jumpNext} value='next'/>
            </div>
        </div>
    )
}

