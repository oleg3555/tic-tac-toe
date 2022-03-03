import React from "react";
import {StepButton} from "../Buttons/StepButton";
import styles from './History.module.css';

export function History({jumpTo}) {
    return (
        <div className={styles.history}>
            <div className={styles.history__title}>History</div>
            <div className={styles.history__moves}>
                <StepButton onClick={() => {
                    jumpTo(false)
                }} value='back'/>
                <StepButton onClick={() => {
                    jumpTo(true)
                }} value='next'/>
            </div>
        </div>
    )
}

