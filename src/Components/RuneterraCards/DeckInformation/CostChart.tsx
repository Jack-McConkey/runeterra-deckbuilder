import {RuneterraCard, SelectedCard} from "../../DeckBuilder/types";
import styles from "./DeckInfo.module.css";

export const generateCostData = (
    cards: {[key: string]: RuneterraCard},
    selectedCards: SelectedCard
) => {
    const cardCosts = Object.entries(selectedCards).reduce<{[key: string]: number}>(
        (costs, [cardCode, {count}]) => {
            const card = cards[cardCode];
            if (card.cost > 7) {
                costs["8+"] += count;
                return costs;
            }
            costs[card.cost] += count;
            return costs;
        },
        {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, "8+": 0}
    );
    return cardCosts;
};

export default function CostChart({costData}: {costData: {[key: string]: number}}) {
    const preparedCostData = Object.entries(costData).map(([key, value]) => {
        const height = value * 5;
        return (
            <div key={key} className={styles["bar-container"]}>
                <div className={styles["bar"]} style={{height: `${height}px`}}></div>
                <div className={styles.cost}>{key}</div>
            </div>
        );
    });
    return (
        <div className={styles["flex-container"]}>
            <h3 className={styles["chart-title"]}>Cost</h3>
            <div className={styles["chart-container"]}>{preparedCostData}</div>
        </div>
    );
}
