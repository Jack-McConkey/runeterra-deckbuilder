import {useMemo} from "react";
import styles from "./RuneterraCard.module.css";
import {RuneterraCard} from "../../DeckBuilder/types";
import Image from "next/future/image";

interface CardProps {
    card: RuneterraCard;
    handleCardClick: () => void;
    hidden: boolean;
    validSelection: boolean;
    count: number;
}

export default function Card({card, handleCardClick, hidden, validSelection, count}: CardProps) {
    let containerStyles = styles["card-container"];
    if (hidden) containerStyles += ` ${styles.hidden}`;
    if (!validSelection) containerStyles += ` ${styles.invalid}`;

    return (
        <button
            aria-roledescription="Adds card to deck"
            data-cname={card.name}
            data-cost={card.cost}
            onClick={handleCardClick}
            className={containerStyles}>
            {count > 0 && <span className={styles.counter} color="white">{`${count}/3`}</span>}
            {useMemo(() => {
                return (
                    <Image
                        key={card.cardCode}
                        src={`https://res.cloudinary.com/dqppxtwa1/image/upload/cards/${card.set.toLowerCase()}/${
                            card.cardCode
                        }.webp`}
                        alt={`Image of Runeterra Card: ${card.name}`}
                        style={{height: "auto", width: "100%"}}
                        height={376}
                        width={250}
                        priority={card.rarity === "Champion" && card.cost < 3}
                    />
                );
            }, [])}
        </button>
    );
}
