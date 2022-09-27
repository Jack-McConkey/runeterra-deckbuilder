import styles from "./RiotDisclosure.module.css";

export default function RiotDisclosure() {
    return (
        <div className={styles.container}>
            <p className={styles.disclosure}>
                This website isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or
                opinions of Riot Games or anyone officially involved in producing or managing Riot
                Games properties. Riot Games, and all associated properties are trademarks or
                registered trademarks of Riot Games, Inc.
            </p>
        </div>
    );
}
