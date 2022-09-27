import {useMemo} from "react";
import styles from "./RuneterraCard.module.css";
import {RuneterraCard} from "../../DeckBuilder/types";
import Image from "next/future/image";

interface CardProps {
    card: RuneterraCard;
    handleCardClick: () => void;
    hidden: boolean;
    validSelection: boolean;
}

export default function Card({card, handleCardClick, hidden, validSelection}: CardProps) {
    let containerStyles = styles["card-container"];
    if (hidden) containerStyles += ` ${styles.hidden}`;
    if (!validSelection) containerStyles += ` ${styles.invalid}`;

    return (
        <button
            data-cname={card.name}
            data-cost={card.cost}
            onClick={handleCardClick}
            className={containerStyles}>
            {useMemo(() => {
                return (
                    <Image
                        key={card.cardCode}
                        src={`https://res.cloudinary.com/dqppxtwa1/image/upload/cards/${card.set.toLowerCase()}/${
                            card.cardCode
                        }.webp`}
                        style={{height: "auto", width: "100%"}}
                        height={376}
                        width={250}
                        priority={card.rarity === "Champion"}
                    />
                );
            }, [])}
        </button>
    );
}
