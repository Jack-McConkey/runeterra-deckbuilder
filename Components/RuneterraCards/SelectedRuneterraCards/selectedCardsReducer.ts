import {Reducer} from "react";
import {SelectedCard} from "../../DeckBuilder/types";

interface SelectedCardAction {
    type: string;
    cardCode: string;
}

export const selectedCardsReducer: Reducer<SelectedCard, SelectedCardAction> = (state, action) => {
    switch (action.type) {
        case "add": {
            if (state[action.cardCode]?.count === 3) return state;
            if (state[action.cardCode]) {
                return {
                    ...state,
                    [action.cardCode]: {
                        count: state[action.cardCode].count + 1,
                    },
                };
            } else
                return {
                    ...state,
                    [action.cardCode]: {
                        count: 1,
                    },
                };
        }
        case "removeOne": {
            if (!state[action.cardCode]) return state;
            if (state[action.cardCode].count === 1) {
                const copy = {...state};
                delete copy[action.cardCode];
                return copy;
            }
            return {
                ...state,
                [action.cardCode]: {
                    count: state[action.cardCode].count - 1,
                },
            };
        }
        case "removeAll": {
            if (!state[action.cardCode]) return state;
            const copy = {...state};
            delete copy[action.cardCode];
            return copy;
        }
        case "clearDeck": {
            return {};
        }
        default: {
            return state;
        }
    }
};
