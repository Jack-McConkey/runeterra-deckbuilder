import {DeckInformation, RuneterraCard, SelectedCard} from "../../DeckBuilder/types";
import Card from "./RuneterraCard";
import filterReducer, {filterRuneterraCards} from "../../CardFilters/filterHelpers";
import styles from "./RuneterraCardsContainer.module.css";
import {CardContext} from "../../Contexts/CardContext";
import {useContext, useEffect, useReducer, useState} from "react";
import {intialFilters} from "../../CardFilters/filterOptions";
import FilterActions from "../../CardFilters/FilterActions";
import TextInput from "../../UI/TextInput/TextInput";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import RuneterraCardGrid from "./RuneterraCardGrid";

interface RuneterraCardsContainer {
    addToSelectedCards: (type: string, cardCode: string) => void;
    deckInformation?: DeckInformation;
    selectedCards: SelectedCard;
}

function ActionOverlay() {
    return (
        <div style={{marginInline: "auto"}}>
            <h3>Add cards by tapping or clicking on them!</h3>
        </div>
    );
}

export default function RuneterraCardsContainer({
    addToSelectedCards,
    deckInformation,
    selectedCards,
}: RuneterraCardsContainer) {
    const [searchValue, setSearchValue] = useState("");
    const [filters, dispatchFilters] = useReducer(filterReducer, intialFilters);
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timer;
        if (notifications.length > 0) {
            const newNotifications = [...notifications];
            newNotifications.pop();
            interval = setInterval(() => {
                return setNotifications(() => newNotifications);
            }, 500);
        }
        return () => {
            clearTimeout(interval);
        };
    }, [notifications]);

    const cards = useContext(CardContext);
    if (!cards) return null;

    const filterInvalidCards = () => {
        if (deckInformation?.regions.length === 2 && filters.regions.length === 0) {
            dispatchFilters({
                type: "regions",
                filterOption: [deckInformation.regions[0], deckInformation.regions[1]],
            });
        }
        if (deckInformation?.champion === 6 && filters.rarity.length === 0) {
            dispatchFilters({type: "rarity", filterOption: ["COMMON", "RARE", "EPIC"]});
        }
    };

    const cardClickHandler = (cardCode: string, isValid: boolean, notificationMsg: string) => {
        if (!isValid) return setNotifications(prev => [...prev, notificationMsg]);
        addToSelectedCards("add", cardCode);
    };

    const preparedCards = Object.values(cards).map((card: RuneterraCard) => {
        let validSelection = true;
        let notificationMessage = "";
        let hidden =
            !card.name.toLowerCase().includes(searchValue) || filterRuneterraCards(card, filters);
        if (
            deckInformation?.regions.length === 2 &&
            !deckInformation.regions.includes(card.regions[0]) &&
            !deckInformation.regions.includes(card.regions[1])
        ) {
            validSelection = false;
            notificationMessage = `Invalid Region, Please Select From ${deckInformation.regions[0]} or ${deckInformation.regions[1]}`;
        }

        if (deckInformation?.champion === 6 && card.rarity === "Champion") {
            validSelection = false;
            notificationMessage = `Maximum Champions Selected`;
        }
        if (deckInformation?.total === 40) {
            validSelection = false;
            notificationMessage = `Deck is Full`;
        }
        if (selectedCards[card.cardCode] && selectedCards[card.cardCode].count === 3) {
            validSelection = false;
            notificationMessage = `${card.name}: 3/3 Selected.`;
        }
        return (
            <Card
                validSelection={validSelection}
                card={card}
                key={card.cardCode}
                count={selectedCards[card.cardCode] ? selectedCards[card.cardCode].count : 0}
                handleCardClick={() =>
                    cardClickHandler(card.cardCode, validSelection, notificationMessage)
                }
                hidden={hidden}
            />
        );
    });

    return (
        <section className={styles.container}>
            <div className={styles["actions-container--filters"]}>
                <div className={styles["btns-container"]}>
                    <FilterActions
                        filters={filters}
                        dispatchFilters={dispatchFilters}
                        invalidCards={
                            (deckInformation?.champion === 6 && filters.rarity.length === 0) ||
                            (deckInformation?.regions.length === 2 && filters.regions.length === 0)
                        }
                        filterInvalidCards={filterInvalidCards}
                    />
                </div>
                <TextInput
                    inputId="search"
                    labelText="Search"
                    setValue={setSearchValue}
                    value={searchValue}
                />
            </div>
            {deckInformation?.total === 0 && <ActionOverlay />}
            <RuneterraCardGrid>{preparedCards}</RuneterraCardGrid>

            {notifications.length > 0 && (
                <ClientOnlyPortal selector="#modal">
                    <ul
                        className={styles["notification-list"]}
                        style={{position: "fixed", top: 0, left: 0, color: "white"}}>
                        {notifications.map((notification, i) => {
                            return (
                                <li className={styles.notification} key={Math.random()}>
                                    {notification}
                                </li>
                            );
                        })}
                    </ul>
                </ClientOnlyPortal>
            )}
        </section>
    );
}
