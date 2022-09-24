import {useMemo} from "react";
import styles from "./RuneterraCard.module.css";
import {RuneterraCard} from "../../DeckBuilder/types";
import Image from "next/image";

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
        <button onClick={handleCardClick} className={containerStyles}>
            {useMemo(() => {
                return (
                    <Image
                        key={card.cardCode}
                        src={`https://res.cloudinary.com/dqppxtwa1/image/upload/cards/${card.set.toLowerCase()}/${
                            card.cardCode
                        }.webp`}
                        layout={"intrinsic"}
                        height="376px"
                        width="250px"
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                    />
                );
            }, [])}
        </button>
    );
}
