export interface RuneterraCard {
    artistName: string;
    assets: [{fullAbsolutePath: string; gameAbsolutePath: string}];
    associatedCardRefs: [];
    associatedCards: [];
    attack: number;
    cardCode: string;
    collectible: boolean;
    cost: number;
    description: string;
    descriptionRaw: string;
    flavorText: string;
    health: number;
    hidden?: boolean;
    keywordRefs: [];
    keywords: [];
    levelupDescription: string;
    levelupDescriptionRaw: string;
    name: string;
    rarity: string;
    rarityRef: string;
    regionRefs: [];
    regions: string[];
    set: string;
    spellSpeed: string;
    spellSpeedRef: string;
    subtypes: [];
    supertype: string;
    type: string;
    counter?: number;
}

export interface FilterOptions {
    cost: number[];
    regions: string[];
    type: string[];
    rarity: string[];
    set: string[];
}

export interface DeckInformation {
    champion: number;
    unit: number;
    spell: number;
    landmark: number;
    equipment: number;
    total: number;
    regions: string[];
}

export interface SelectedCard {
    [key: string]: {count: number};
}
