import styles from "./SelectedCards.module.css";
import Image from "next/image";
import {RuneterraCard} from "../../DeckBuilder/types";
import Modal from "../../UI/Modal/Modal";
import {useState} from "react";
import DetailedRuneterraCard from "../DetailedRuneterraCard/DetailedRuneterraCard";
import Button from "../../UI/Button/Button";
import {trpc} from "../../../utils/trpc";
import RuneterraCardGrid from "../RuneterraCards/RuneterraCardGrid";

interface CardProps {
    card: RuneterraCard;
    count: number;
    updateSelectedCards: (type: string, cardCode: string) => void;
    validRegion: boolean;
}

export default function SelectedCards({card, count, updateSelectedCards, validRegion}: CardProps) {
    const [showCardDetails, setShowCardDetails] = useState("");
    const openModal = (e: any, cardCode: string) => {
        setShowCardDetails(cardCode);
    };
    const closeModal = () => {
        setShowCardDetails("");
    };

    const {data, isLoading} = trpc.relatedCards.useQuery(
        {
            relatedCards: JSON.stringify(card.associatedCardRefs),
        },
        {refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false}
    );

    const preparedRelatedCards = data?.reduce(
        (preparedCards, data) => {
            const card: RuneterraCard = data.card as unknown as RuneterraCard;
            preparedCards[card.cardCode] = card;
            return preparedCards;
        },
        {[card.cardCode]: card} as {[key: string]: RuneterraCard}
    );

    return (
        <div className={styles["mini-card-container"]}>
            {validRegion && (
                <div className={styles["button-container"]}>
                    <button
                        disabled={count === 3}
                        className={styles.btn}
                        onClick={() => {
                            updateSelectedCards("add", card.cardCode);
                        }}>
                        +
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => {
                            updateSelectedCards("removeOne", card.cardCode);
                        }}>
                        -
                    </button>
                </div>
            )}
            <div className={styles["img_container"]}>
                <Image
                    objectFit="cover"
                    objectPosition="100% 20%"
                    layout="intrinsic"
                    src={`https://res.cloudinary.com/dqppxtwa1/image/upload/cards/${card.set.toLowerCase()}/${
                        card.cardCode
                    }-full.webp`}
                    alt={`Image of Runeterra Card ${card.name}`}
                    width="550px"
                    height="80px"
                    loading="eager"
                />
                {!validRegion && (
                    <div className={[styles["more-info"], styles["invalid-region"]].join(" ")}>
                        <span className={styles["invalid-region-text"]}>Invalid Region: </span>
                        <Button
                            key={card.cardCode}
                            styling="region-error"
                            isDisabled={false}
                            handleClick={() => {
                                updateSelectedCards("removeAll", card.cardCode);
                            }}>
                            Remove Card
                        </Button>
                    </div>
                )}
                {validRegion && !isLoading && (
                    <>
                        <button
                            className={styles["more-info"]}
                            onClick={e => openModal(e, card.cardCode)}>
                            <Image
                                layout="fixed"
                                src={
                                    "https://res.cloudinary.com/dqppxtwa1/image/upload/v1663859711/icons/eye_rcpks3.png"
                                }
                                alt={`Image of Runeterra Card ${card.name}`}
                                width="50px"
                                height="50px"
                            />
                        </button>
                        <span className={styles.counter} color="white">{`${count}/3`}</span>
                    </>
                )}
            </div>
            {showCardDetails && (
                <Modal style="detailed-card-modal" handleClose={closeModal}>
                    <>
                        <Button
                            isDisabled={false}
                            styling={"absolute-close"}
                            handleClick={closeModal}>
                            X
                        </Button>
                        <DetailedRuneterraCard
                            card={card}
                            relatedCards={
                                card.associatedCardRefs.length > 0
                                    ? preparedRelatedCards
                                    : undefined
                            }
                        />
                        <Button isDisabled={false} styling={"close"} handleClick={closeModal}>
                            Close
                        </Button>
                    </>
                </Modal>
            )}
        </div>
    );
}
