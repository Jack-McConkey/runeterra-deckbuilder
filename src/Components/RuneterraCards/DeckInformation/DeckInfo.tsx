import {DeckInformation} from "../../DeckBuilder/types";
import styles from "./DeckInfo.module.css";
import Image from "next/image";
import Button from "../../UI/Button/Button";

interface DeckInfoImgProps {
    imgPath: string;
    altText: string;
}

function DeckInfoImg({imgPath, altText}: DeckInfoImgProps) {
    return (
        <div data-region={altText}>
            <Image
                width={"40px"}
                height={"40px"}
                alt={`Img of ${altText} logo`}
                unoptimized={true}
                src={`https://res.cloudinary.com/dqppxtwa1/image/upload/icons/${imgPath}.webp`}
            />
        </div>
    );
}

interface DeckActionsProps {
    clearDeck: () => void;
    saveDeck: () => void;
    showDeckDetails: () => void;
    deckInfo: DeckInformation;
}

export function DeckActions({clearDeck, saveDeck, deckInfo, showDeckDetails}: DeckActionsProps) {
    return (
        <>
            <Button isDisabled={deckInfo.total !== 40} handleClick={saveDeck} key={2}>
                Save Deck
            </Button>
            <Button
                styling="clear"
                isDisabled={deckInfo.total === 0}
                handleClick={clearDeck}
                key={3}>
                Clear Deck
            </Button>
            <Button isDisabled={false} handleClick={showDeckDetails}>
                Deck Details
            </Button>
        </>
    );
}

export function DeckInfo({
    deckInfo,
    flexDirection = "row",
}: {
    deckInfo: DeckInformation;
    flexDirection?: string;
}) {
    const regionOne = deckInfo?.regions[0]?.replaceAll(" ", "").replace("&", "") ?? null;
    const regionTwo = deckInfo?.regions[1]?.replaceAll(" ", "").replace("&", "") ?? null;

    return (
        <div className={[styles["info-container"], styles[`flex-${flexDirection}`]].join(" ")}>
            <div className={[styles["info-item"], styles["info-item--region"]].join(" ")}>
                {regionOne && <DeckInfoImg imgPath={`icon-${regionOne}`} altText={regionOne} />}
                {regionTwo && <DeckInfoImg imgPath={`icon-${regionTwo}`} altText={regionTwo} />}
            </div>
            <div className={styles["deck-total"]}>{deckInfo.total}/40</div>
        </div>
    );
}
