import React from "react";
import styles from './Checkbox.module.css';

export function Checkbox({checked, onClick, text, id}) {
    return (
        <div>
            <input type="radio" autoComplete="off"
                   id={id}
                   onChange={onClick}
                   checked={checked}/>
            <label htmlFor={id} className={styles.label}>{text}</label>
        </div>
    )
}