import React from "react";
import styles from './Checkbox.module.css';

export function Checkbox({checked, onClick, text, name}) {
    return (
        <div>
            <input type="radio" autoComplete="off"
                   id={name}
                   name={name}
                   onChange={onClick}
                   checked={checked}/>
            <label htmlFor={name} className={styles.label}>{text}</label>
        </div>
    )
}