import React from "react";
import styles from './Square.module.css';

export function Square({onClick, value}) {
    const onClickHandler = () => {
        onClick();
    }
    return (
        <button className={styles.square}
                onClick={onClickHandler}>
            {value}
        </button>
    )
}