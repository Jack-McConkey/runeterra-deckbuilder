import {RuneterraCard, FilterOptions} from "../DeckBuilder/types";
import {intialFilters} from "./filterOptions";

export interface Actions<T> {
    type: keyof FilterOptions | "clear";
    filterOption: T[];
}

export default function filterReducer(
    prevFilters: FilterOptions,
    action: Actions<string | number>
): FilterOptions {
    if (action.type === "clear") return {...intialFilters};
    const newArr = [...prevFilters[action.type]] ?? null;

    if (newArr) {
        for (const option of action.filterOption) {
            newArr.includes(option)
                ? newArr.splice(newArr.indexOf(option), 1)
                : newArr.push(option);
        }
    }

    switch (action.type) {
        case "cost": {
            return {
                ...prevFilters,
                [action.type as keyof FilterOptions]: newArr,
            };
        }
        case "regions": {
            return {
                ...prevFilters,
                [action.type as keyof FilterOptions]: newArr,
            };
        }
        case "type": {
            return {
                ...prevFilters,
                [action.type as keyof FilterOptions]: newArr,
            };
        }
        case "rarity": {
            return {
                ...prevFilters,
                [action.type as keyof FilterOptions]: newArr,
            };
        }
        case "set": {
            return {
                ...prevFilters,
                [action.type as keyof FilterOptions]: newArr,
            };
        }
        default: {
            return {
                ...prevFilters,
            };
        }
    }
}

export function filterRuneterraCards(card: RuneterraCard, filters: any) {
    // Checking if the cost of the card is included in filters
    if (filters.cost.length > 0 && card.cost < 8 && !filters.cost.includes(card.cost)) return true;
    // Additional cost check, if card cost is greater or equal to 8
    if (filters.cost.length > 0 && card.cost >= 8 && !filters.cost.some((ele: number) => ele >= 8))
        return true;
    // Checking if the cards region is included in filters
    if (
        filters.regions.length > 0 &&
        !filters.regions.some(
            (region: string) => region === card.regions[0] || region === card.regions[1]
        )
    )
        return true;
    // Checking if the cards type is included in filters
    if (filters.type.length > 0 && !filters.type.includes(card.type)) return true;
    // Checking if the cards rarity is included in filters
    if (filters.rarity.length > 0 && !filters.rarity.includes(card.rarity)) return true;
    // Checking if the cards set is included in filters
    if (filters.set.length > 0 && !filters.set.includes(card.set)) return true;
    // Checking if the card is a playable card
    if (card.type === "Ability" || card.type === "Trap" || !card.collectible) return true;
    // If all checks are passed then we return false, this means the card is NOT filtered out
    return false;
}
