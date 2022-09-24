import Image from "next/image";
import {useContext, useState} from "react";
import {CardContext} from "../../Contexts/CardContext";
import Button from "../../UI/Button/Button";
import styles from "./DetailedRuneterraCard.module.css";

export default function DetailedRuneterraCard({cardCode}: {cardCode: string}) {
    const [currentCardCode, setCurrentCardCode] = useState(cardCode);
    const cards = useContext(CardContext);
    if (!cards) return null;
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.img}>
                    <Image
                        key={cards[cardCode].cardCode}
                        src={`https://res.cloudinary.com/dqppxtwa1/image/upload/v1661976981/cards/${cards[
                            currentCardCode
                        ].set.toLowerCase()}/${cards[currentCardCode].cardCode}.webp`}
                        layout={"fixed"}
                        height="376px"
                        width="250px"
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                    />
                </div>
            </div>
            <div className={styles["card-info-container"]}>
                {cards[cardCode].associatedCardRefs.length > 0 && (
                    <div className={styles["related-cards"]}>
                        <span className={styles["param-title"]}>Related Cards:</span>
                        <Button
                            handleClick={() => setCurrentCardCode(cardCode)}
                            isDisabled={cardCode === currentCardCode}
                            styling={"related-card"}
                            key={cardCode}>
                            1
                        </Button>
                        {cards[cardCode].associatedCardRefs.map((card, index) => {
                            const code = cards[card].cardCode;
                            return (
                                <Button
                                    handleClick={() => setCurrentCardCode(code)}
                                    isDisabled={code === currentCardCode}
                                    styling={"related-card"}
                                    key={code}>
                                    {index + 2}
                                </Button>
                            );
                        })}
                    </div>
                )}
                <p>
                    <span className={styles["param-title"]}>Name: </span>
                    {cards[currentCardCode].name}
                </p>
                <p>
                    <span className={styles["param-title"]}>Cost: </span>{" "}
                    {cards[currentCardCode].cost}
                </p>
                <p>
                    <span className={styles["param-title"]}>Description: </span>
                    {cards[currentCardCode].descriptionRaw}
                </p>
                <p>
                    <span className={styles["param-title"]}>Flavor Text: </span>
                    {cards[currentCardCode].flavorText}
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
