import {useEffect, useState} from "react";
import {RuneterraCard} from "../Components/DeckBuilder/types";

//Currently unused, using SSG for cards instead

export default function useCards() {
    const [cards, setCards] = useState({});
    useEffect(() => {
        const fetchCards = async () => {
            const res = await fetch("/api/getcards");
            const data: [{id: string; cardCode: string; card: RuneterraCard}] = await res.json();
            const cards = data
                .reduce<RuneterraCard[]>((newCards, {card}: any) => {
                    newCards.push(card);
                    return newCards;
                }, [])
                .sort(({cost: a}, {cost: b}) => a - b)
                .sort(({rarity: a}, {rarity: b}) => {
                    if (a === b) return 0;
                    if (a === "Champion") return -1;
                    return 0;
                })
                .reduce<{[key: string]: RuneterraCard}>((obj, card) => {
                    obj[card.cardCode] = card;
                    return obj;
                }, {});
            setCards(cards);
        };
        fetchCards();
    }, []);
    return cards;
}
