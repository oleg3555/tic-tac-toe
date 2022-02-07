import React from "react";
import styles from './GameInfo.module.css'

export function GameInfo({status}) {
    return <div className={styles.status}>{status}</div>
}
