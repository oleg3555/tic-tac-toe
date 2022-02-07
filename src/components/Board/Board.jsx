import React from "react";
import {Square} from "../Square/Square";
import styles from './Board.module.css';

export function Board({squares, onClick}) {
    return (
        <div className={styles.board}>
            {squares.map((square, index) => {
                    const clickHandler = () => {
                        onClick(index);
                    }
                    return (<Square key={index}
                                    value={square}
                                    onClick={clickHandler}
                    />)
                }
            )}
        </div>
    )
}
