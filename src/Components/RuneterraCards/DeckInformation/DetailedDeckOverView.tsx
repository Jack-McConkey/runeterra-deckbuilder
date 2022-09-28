import {useContext} from "react";
import {CardContext} from "../../Contexts/CardContext";
import {SelectedCard} from "../../DeckBuilder/types";
import SelectedCards from "../SelectedRuneterraCards/SelectedCards";
import styles from "./DeckInfo.module.css";

//Currently unused components

export default function DetailedDeckOverview({selectedCards}: {selectedCards: SelectedCard}) {
    const cards = useContext(CardContext)!;
    const preparedCards = Object.entries(selectedCards).reduce<{[key: string]: JSX.Element[]}>(
        (elements, [cardCode, {count}]) => {
            if (cards[cardCode].rarity === "Champion") {
                elements.Champions.push(
                    <SelectedCards
                        card={cards[cardCode]}
                        count={count}
                        validRegion={true}
                        updateSelectedCards={() => console.log()}
                        key={cardCode}
                    />
                );
                return elements;
            }
            const type =
                cards[cardCode].type === "Equipment"
                    ? `${cards[cardCode].type}`
                    : `${cards[cardCode].type}s`;

            elements[type].push(
                <SelectedCards
                    card={cards[cardCode]}
                    count={count}
                    validRegion={true}
                    updateSelectedCards={() => console.log()}
                    key={cardCode}
                />
            );
            return elements;
        },
        {Champions: [], Spells: [], Landmarks: [], Units: [], Equipment: []}
    );
    return (
        <div className={styles["full-detailed-container"]}>
            {Object.entries(preparedCards).map(([category, elements]) => {
                if (elements.length === 0) return;
                return (
                    <div
                        key={category}
                        style={{gridRow: `span ${elements.length}`}}
                        className={styles["detailed-category-container"]}>
                        <h2 className={styles["detailed-category-title"]}>{category}</h2>
                        <div className={styles["detailed-category-cards"]}>{elements}</div>
                    </div>
                );
            })}
        </div>
    );
}
