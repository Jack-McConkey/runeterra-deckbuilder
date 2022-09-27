import {useState} from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import styles from "./Header.module.css";
import Link from "next/link";

function NavList({styling}: {styling: "modal" | "standard"}) {
    return (
        <ul className={styles[`nav-list-${styling}`]}>
            <li className={styles["nav-list__item"]}>
                <Link href={"/"}>
                    <a className={styles["nav-list__link"]} rel="stylesheet">
                        Deck Builder
                    </a>
                </Link>
            </li>

            <li className={styles["nav-list__item"]}>
                <a className={styles["nav-list__link"]} rel="stylesheet" href="#">
                    Decks
                </a>
            </li>
        </ul>
    );
}

export default function Header() {
    const [navIsOpen, setNavIsOpen] = useState(false);
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>Runeterra App</div>
                <nav className={styles.nav}>
                    <div
                        className={styles["hamburger-container"]}
                        onClick={() => setNavIsOpen(prev => !prev)}>
                        <button className={styles["hamburger"]}></button>
                    </div>
                    <NavList styling="standard" />
                </nav>
            </div>
            {navIsOpen && (
                <Modal style="nav-modal" handleClose={() => setNavIsOpen(false)}>
                    <>
                        <Button
                            handleClick={() => setNavIsOpen(false)}
                            styling="absolute-close"
                            isDisabled={false}>
                            X
                        </Button>
                        <NavList styling="modal" />
                    </>
                </Modal>
            )}
        </header>
    );
}
