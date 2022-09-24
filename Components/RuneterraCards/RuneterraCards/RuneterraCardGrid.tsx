import styles from "./RuneterraCardsContainer.module.css";

export default function RuneterraCardGrid({children}: {children: JSX.Element[]}) {
    return <div className={styles["card-art-grid"]}>{children}</div>;
}
