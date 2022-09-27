import React, {useEffect, useRef} from "react";
import ClientOnlyPortal from "../ClientOnlyPortal";
import styles from "./Modal.module.css";

export default function Modal({
    children,
    handleClose,
    style,
}: {
    children: JSX.Element;
    handleClose: () => void;
    style: string;
}) {
    // useEffect(() => {
    //     document.body.style.overflow = "hidden";

    //     return () => {
    //         document.body.style.overflow = "unset";
    //     };
    // }, []);

    useEffect(() => {
        const previousFocus = document.activeElement as HTMLElement;
        return () => previousFocus?.focus();
    }, []);

    useEffect(() => {
        function keyListener(e: KeyboardEvent) {
            const listener = keyListenersMap.get(e.code);
            return listener && listener(e);
        }
        document.addEventListener("keydown", keyListener);

        return () => document.removeEventListener("keydown", keyListener);
    });

    const modalRef = useRef<null | HTMLDivElement>(null);
    const focusRef = useRef<null | Element>(null);

    const handleTabKey = (e: KeyboardEvent) => {
        if (!modalRef.current) return;
        const focusableModalElements = modalRef.current.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

        const firstElement = focusableModalElements[0] as HTMLElement;
        const lastElement = focusableModalElements[
            focusableModalElements.length - 1
        ] as HTMLElement;

        if (!e.shiftKey && document.activeElement !== firstElement && focusRef.current === null) {
            firstElement.focus();
            return e.preventDefault();
        }

        if (e.shiftKey && document.activeElement !== lastElement && focusRef.current === null) {
            lastElement.focus();
            e.preventDefault();
        }

        if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        }

        focusRef.current = document.activeElement;
    };

    const keyListenersMap = new Map([
        ["Escape", handleClose],
        ["Tab", handleTabKey],
    ]);

    return (
        <ClientOnlyPortal selector="#modal">
            <div
                aria-modal={true}
                onClick={e => {
                    e.preventDefault();
                    handleClose();
                }}
                className={styles.backdrop}>
                <div
                    className={[[styles[style]], styles["base-modal"]].join(" ")}
                    ref={modalRef}
                    onClick={e => {
                        e.stopPropagation();
                    }}>
                    {children}
                </div>
            </div>
        </ClientOnlyPortal>
    );
}
