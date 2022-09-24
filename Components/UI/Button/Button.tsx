import React from "react";
import styles from "./Button.module.css";

interface BtnProps {
    children: React.ReactNode;
    isDisabled: boolean;
    handleClick: () => void;
    styling?: string;
}

export default function Button({children, isDisabled, handleClick, styling}: BtnProps) {
    const btnStyle = styling ? [styles.btn, styles[styling]].join(" ") : styles.btn;
    return (
        <button className={btnStyle} disabled={isDisabled} onClick={handleClick}>
            {children}
        </button>
    );
}
