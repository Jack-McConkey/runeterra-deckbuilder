import {createContext} from "react";
import {RuneterraCard} from "../DeckBuilder/types";

interface CardContextInterface {
    [key: string]: RuneterraCard;
}

export const CardContext = createContext<CardContextInterface | null>(null);
