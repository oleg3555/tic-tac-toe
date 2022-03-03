import React from "react";
import styles from './StepButton.module.css';


export function StepButton({onClick,value}) {
    return <button className={styles.button} onClick={onClick}>{`Move to ${value}`}</button>
}
