import {SelectedCard} from "../Components/DeckBuilder/types";
import {Deck} from "lor-deckcodes-ts/dist/types";
import {getCodeFromDeck} from "lor-deckcodes-ts";

export const generateDeckCode = (selectedCards: SelectedCard): [Deck, string] => {
    const deck: Deck = Object.entries(selectedCards)
        .reduce((newArr: Deck, [cardCode, {count}]) => {
            newArr.push({cardCode: cardCode, count: count});
            return newArr;
        }, [])
        .sort((a, b) => b.count - a.count);
    const deckCode = getCodeFromDeck(deck);
    return [deck, deckCode];
};

export const saveDeck = async (deck: Deck, deckCode: string) => {
    const data = {cards: deck, deckCode: deckCode};
    await fetch("/api/create-deck", {
        method: "POST",
        body: JSON.stringify(data),
    });
};
