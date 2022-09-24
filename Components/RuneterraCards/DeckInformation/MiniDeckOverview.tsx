import {useContext} from "react";
import {CardContext} from "../../Contexts/CardContext";
import {DeckInformation, SelectedCard} from "../../DeckBuilder/types";
import {DeckInfo} from "./DeckInfo";
import styles from "./DeckInfo.module.css";
import CostChart from "./CostChart";
import {generateCostData} from "./CostChart";

function DetailedOption({deckOption, results}: {deckOption: string; results: string}) {
    return (
        <div className={styles["info-item"]}>
            <span className={styles["info-option"]}>{deckOption}</span>
            {results}
        </div>
    );
}

export default function MiniDeckOverview({
    deckInfo,
    selectedCards,
}: {
    deckInfo: DeckInformation;
    selectedCards: SelectedCard;
}) {
    const cards = useContext(CardContext);
    if (!cards) return null;

    const cardCosts = generateCostData(cards, selectedCards);

    return (
        <>
            <div className={styles["mini-deck-container"]}>
                <CostChart costData={cardCosts} />
                <div className={styles["mini-deck-flex"]}>
                    <div className={styles["options-container"]}>
                        <DetailedOption
                            key={1}
                            deckOption={"Champions: "}
                            results={deckInfo.champion.toString()}
                        />
                        <DetailedOption
                            key={2}
                            deckOption={"Units: "}
                            results={deckInfo.unit.toString()}
                        />
                        <DetailedOption
                            key={3}
                            deckOption={"Spells: "}
                            results={deckInfo.spell.toString()}
                        />
                        <DetailedOption
                            key={4}
                            deckOption={"Landmarks: "}
                            results={deckInfo.landmark.toString()}
                        />
                        <DetailedOption
                            key={5}
                            deckOption={"Equipment: "}
                            results={deckInfo.equipment.toString()}
                        />
                    </div>
                    <DeckInfo flexDirection={"col"} deckInfo={deckInfo} />
                </div>
            </div>
        </>
    );
}
