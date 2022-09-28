import styles from "./SelectedCards.module.css";
import {SelectedCard} from "../../DeckBuilder/types";
import {useContext} from "react";
import {CardContext} from "../../Contexts/CardContext";
import deckDetails from "../../../utils/deckDetails";
import SelectedCards from "./SelectedCards";

interface ContainerProps {
    selectedCards: SelectedCard;
    updateSelectedCards: (type: string, cardCode: string) => void;
}

export default function SelectedCardsContainer({
    selectedCards,
    updateSelectedCards,
}: ContainerProps) {
    const cards = useContext(CardContext)!;

    const {regions} = deckDetails(cards, selectedCards);
    return (
        <div className={styles["selected_container"]}>
            {Object.entries(selectedCards)
                .sort((a, b) => cards[a[0]].cost - cards[b[0]].cost)
                .map(([cardCode, {count}]) => {
                    let validRegion = false;
                    if (
                        (regions.length === 2 && regions.includes(cards[cardCode].regions[0])) ||
                        regions.includes(cards[cardCode]?.regions[1])
                    )
                        validRegion = true;
                    if (regions.length !== 2) validRegion = true;
                    return (
                        <SelectedCards
                            validRegion={validRegion}
                            card={cards[cardCode]}
                            key={cards[cardCode].cardCode}
                            count={count}
                            updateSelectedCards={updateSelectedCards}
                        />
                    );
                })}
        </div>
    );
}
