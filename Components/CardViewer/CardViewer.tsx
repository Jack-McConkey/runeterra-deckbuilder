import React, {useContext, useReducer, useState} from "react";
import styles from "./CardViewer.module.css";
import RuneterraCardGrid from "../RuneterraCards/RuneterraCards/RuneterraCardGrid";
import Card from "../RuneterraCards/RuneterraCards/RuneterraCard";

import {CardContext} from "../Contexts/CardContext";
import FilterActions from "../CardFilters/FilterActions";
import TextInput from "../UI/TextInput/TextInput";
import filterReducer, {filterRuneterraCards} from "../CardFilters/filterHelpers";
import {intialFilters} from "../CardFilters/filterOptions";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import DetailedRuneterraCard from "../RuneterraCards/DetailedRuneterraCard/DetailedRuneterraCard";

export default function CardViewer() {
    const cards = useContext(CardContext);
    const [searchValue, setSearchValue] = useState("");
    const [showCardDetails, setShowCardDetails] = useState("");
    const [filters, dispatchFilters] = useReducer(filterReducer, intialFilters);
    if (!cards) return null;

    return (
        <main className={styles.container}>
            <div>
                <FilterActions filters={filters} dispatchFilters={dispatchFilters} />
                <TextInput
                    inputId="search"
                    labelText="Search"
                    setValue={setSearchValue}
                    value={searchValue}
                />
            </div>
            <section className={styles.deckbuilder}>
                <RuneterraCardGrid>
                    {Object.values(cards).map(card => {
                        const hidden =
                            !card.name.toLowerCase().includes(searchValue) ||
                            filterRuneterraCards(card, filters);
                        return (
                            <Card
                                card={card}
                                handleCardClick={() => setShowCardDetails(card.cardCode)}
                                hidden={hidden}
                                validSelection={true}
                                key={card.cardCode}
                            />
                        );
                    })}
                </RuneterraCardGrid>
            </section>
            {showCardDetails && (
                <Modal style="detailed-card-modal" handleClose={() => setShowCardDetails("")}>
                    <>
                        <Button
                            isDisabled={false}
                            styling={"absolute-close"}
                            handleClick={() => setShowCardDetails("")}>
                            X
                        </Button>
                        <DetailedRuneterraCard cardCode={showCardDetails} />
                        <Button
                            isDisabled={false}
                            styling={"close"}
                            handleClick={() => setShowCardDetails("")}>
                            Close
                        </Button>
                    </>
                </Modal>
            )}
        </main>
    );
}
