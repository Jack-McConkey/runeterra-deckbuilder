import {DeckInformation, RuneterraCard} from "../Components/DeckBuilder/types";
import {SelectedCard} from "../Components/DeckBuilder/types";

export default function deckDetails(
    cards: {[key: string]: RuneterraCard},
    selectedCards: SelectedCard
) {
    return Object.entries(selectedCards).reduce(
        (deckDetails: DeckInformation, [cardCode, {count}]) => {
            if (
                cards[cardCode].regions.length === 1 &&
                !deckDetails.regions.includes(cards[cardCode].regions[0])
            )
                deckDetails.regions.push(cards[cardCode].regions[0]);

            if (cards[cardCode].rarity === "Champion") {
                deckDetails.champion += count;
                deckDetails.unit += count;
                deckDetails.total += count;
                return deckDetails;
            }

            deckDetails[
                cards[cardCode].type.toLowerCase() as keyof Omit<DeckInformation, "regions">
            ] += count;
            deckDetails.total += count;
            return deckDetails;
        },
        {champion: 0, unit: 0, spell: 0, landmark: 0, equipment: 0, total: 0, regions: []}
    );
}
