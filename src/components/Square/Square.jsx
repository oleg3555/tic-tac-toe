import React from "react";
import styles from './Square.module.css';

export function Square({onClick, value}) {
    return (
        <button className={styles.square}
                onClick={onClick}>
            {value}
        </button>
    )
}