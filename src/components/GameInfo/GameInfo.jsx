import React from "react";
import styles from './GameInfo.module.css'

export function GameInfo({status,botMode}) {
    return (
        <div>
            <div className={styles.status}>{status}</div>
            <div className={styles.description}>{botMode?'Game vs Bot':'Game vs player'}</div>
        </div>
    )
}
