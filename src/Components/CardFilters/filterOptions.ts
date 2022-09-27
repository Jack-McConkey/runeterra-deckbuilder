import {FilterOptions} from "../DeckBuilder/types";

export const filterOptions = {
    cost: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    regions: [
        "Demacia",
        "Ionia",
        "Noxus",
        "Targon",
        "Freljord",
        "Shadow Isles",
        "Bandle City",
        "Shurima",
        "Bilgewater",
        "Piltover & Zaun",
        "Runeterra",
    ],
    type: ["Unit", "Landmark", "Spell", "Equipment"],
    rarity: ["COMMON", "RARE", "EPIC", "Champion"],
    set: ["Set1", "Set2", "Set3", "Set4", "Set5", "Set6", "Set6cde"],
};

export const intialFilters: FilterOptions = {
    cost: [],
    regions: [],
    type: [],
    rarity: [],
    set: [],
};
