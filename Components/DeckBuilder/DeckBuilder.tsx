import React, {useContext, useReducer, useState} from "react";
import styles from "./DeckBuilder.module.css";
import RuneterraCardsContainer from "../RuneterraCards/RuneterraCards/RuneterraCardsContainer";
import {selectedCardsReducer} from "../RuneterraCards/SelectedRuneterraCards/selectedCardsReducer";
import deckDetails from "../../utils/deckDetails";
import SelectedCardsContainer from "../RuneterraCards/SelectedRuneterraCards/SelectedCardsContainer";
import {DeckInfo, DeckActions} from "../RuneterraCards/DeckInformation/DeckInfo";
import {CardContext} from "../Contexts/CardContext";
import Modal from "../UI/Modal/Modal";
import MiniDeckOverview from "../RuneterraCards/DeckInformation/MiniDeckOverview";
import Button from "../UI/Button/Button";
import SaveDeck from "../RuneterraCards/SaveDeck/SaveDeck";

export default function DeckBuilder() {
    const [selectedCards, dispatchSelectedCards] = useReducer(selectedCardsReducer, {});
    const [showDetailedDeckInformation, setShowDetailedDeckInformation] = useState(false);
    const [showSaveWindow, setShowSaveWindow] = useState(false);

    const cards = useContext(CardContext);

    if (!cards) return null;

    const info = deckDetails(cards, selectedCards);

    const updateSelectedCards = (type: string, cardCode: string) => {
        if (info.total === 40 && type === "add") return;
        dispatchSelectedCards({type, cardCode});
    };

    return (
        <main className={styles.container}>
            <section className={styles.deckbuilder}>
                <aside className={styles["deck-container"]}>
                    <div className={styles["actions-container--deck"]}>
                        <div className={styles["btns-container"]}>
                            <DeckActions
                                showDeckDetails={() => setShowDetailedDeckInformation(true)}
                                clearDeck={() =>
                                    dispatchSelectedCards({type: "clearDeck", cardCode: ""})
                                }
                                saveDeck={() => setShowSaveWindow(true)}
                                deckInfo={info}
                            />
                        </div>
                        <DeckInfo deckInfo={info} />
                    </div>
                    <SelectedCardsContainer
                        updateSelectedCards={updateSelectedCards}
                        selectedCards={selectedCards}
                    />
                </aside>
                <RuneterraCardsContainer
                    addToSelectedCards={updateSelectedCards}
                    deckInformation={info}
                    selectedCards={selectedCards}
                />
            </section>
            {showDetailedDeckInformation && (
                <Modal
                    style="deck-info-modal"
                    handleClose={() => setShowDetailedDeckInformation(false)}>
                    <>
                        <MiniDeckOverview deckInfo={info} selectedCards={selectedCards} />
                        <Button
                            handleClick={() => setShowDetailedDeckInformation(false)}
                            isDisabled={false}
                            styling="close">
                            Close
                        </Button>
                    </>
                </Modal>
            )}

            {showSaveWindow && (
                <Modal style="save-deck-modal" handleClose={() => setShowSaveWindow(false)}>
                    <>
                        <SaveDeck
                            selectedCards={selectedCards}
                            clearDeck={() =>
                                dispatchSelectedCards({type: "clearDeck", cardCode: ""})
                            }
                            cancelSave={() => setShowSaveWindow(false)}
                        />
                        <MiniDeckOverview deckInfo={info} selectedCards={selectedCards} />
                        <Button
                            handleClick={() => setShowSaveWindow(false)}
                            isDisabled={false}
                            styling="close">
                            Close
                        </Button>
                    </>
                </Modal>
            )}
        </main>
    );
}
