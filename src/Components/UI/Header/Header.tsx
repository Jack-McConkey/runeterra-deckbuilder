import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>Runeterra Deckbuilder</div>
            </div>
        </header>
    );
}
