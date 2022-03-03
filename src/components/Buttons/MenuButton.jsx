import React from "react";
import styles from './MenuButton.module.css';

export function MenuButton({color,onClick,text}){
    return (
        <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
            {text}
        </button>
    )
}