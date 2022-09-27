import Image from "next/image";
import {useState} from "react";
import {RuneterraCard} from "../../DeckBuilder/types";
import Button from "../../UI/Button/Button";
import styles from "./DetailedRuneterraCard.module.css";

export default function DetailedRuneterraCard({
    card,
    relatedCards,
}: {
    card: RuneterraCard;
    relatedCards: {[key: string]: RuneterraCard} | undefined;
}) {
    const [currentCardCode, setCurrentCardCode] = useState(card.cardCode);
    let cardImg = relatedCards
        ? `${relatedCards[currentCardCode].set.toLowerCase()}/${
              relatedCards[currentCardCode].cardCode
          }`
        : `${card.set.toLowerCase()}/${card.cardCode}`;
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.img}>
                    <Image
                        key={card.cardCode}
                        src={`https://res.cloudinary.com/dqppxtwa1/image/upload/v1661976981/cards/${cardImg}.webp`}
                        layout={"fixed"}
                        height="376px"
                        width="250px"
                        placeholder="blur"
                        alt={`Image of Runeterra Card: ${
                            relatedCards ? relatedCards[currentCardCode].name : card.name
                        }`}
                        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                    />
                </div>
            </div>
            <div className={styles["card-info-container"]}>
                {relatedCards && (
                    <div className={styles["related-cards"]}>
                        <span className={styles["param-title"]}>Related Cards:</span>
                        {Object.values(relatedCards).map((card, index) => {
                            const code = card.cardCode;
                            return (
                                <Button
                                    handleClick={() => setCurrentCardCode(code)}
                                    isDisabled={code === currentCardCode}
                                    styling={"related-card"}
                                    key={code}>
                                    {index + 1}
                                </Button>
                            );
                        })}
                    </div>
                )}
                <p>
                    <span className={styles["param-title"]}>Name: </span>
                    {relatedCards ? relatedCards[currentCardCode].name : card.name}
                </p>
                <p>
                    <span className={styles["param-title"]}>Cost: </span>
                    {relatedCards ? relatedCards[currentCardCode].cost : card.cost}
                </p>
                <p>
                    <span className={styles["param-title"]}>Description: </span>
                    {relatedCards
                        ? relatedCards[currentCardCode].descriptionRaw
                        : card.descriptionRaw}
                </p>
                <p>
                    <span className={styles["param-title"]}>Flavor Text: </span>
                    {relatedCards ? relatedCards[currentCardCode].flavorText : card.flavorText}
                </p>
            </div>
        </div>
    );
}

/*
Name
Desc Raw
Flavor
associated Cards
*/
