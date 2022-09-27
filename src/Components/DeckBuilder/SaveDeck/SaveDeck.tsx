import {useState} from "react";
import {SelectedCard} from "../../DeckBuilder/types";
import Button from "../../UI/Button/Button";
import {generateDeckCode} from "../../../utils/generateDeck";
import styles from "./SaveDeck.module.css";
import {trpc} from "../../../utils/trpc";

export default function SaveDeck({
    cancelSave,
    selectedCards,
    clearDeck,
}: {
    cancelSave: () => void;
    selectedCards: SelectedCard;
    clearDeck: () => void;
}) {
    const [deckCode, setDeckCode] = useState("");
    const [copiedCode, setCopiedCode] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(deckCode);
        setCopiedCode(true);
    };

    const saveDeck = trpc.addDeck.useMutation();
    const handleSave = () => {
        const [deck, deckCode] = generateDeckCode(selectedCards);
        setDeckCode(deckCode);
        saveDeck.mutate({deckCode: deckCode, cards: JSON.stringify(deck)});
    };

    return (
        <>
            {!deckCode && (
                <div className={styles.container}>
                    <Button handleClick={handleSave} styling="close" isDisabled={false}>
                        Confirm Save
                    </Button>
                    <Button handleClick={cancelSave} styling="clear" isDisabled={false}>
                        Cancel
                    </Button>
                </div>
            )}

            {deckCode && (
                <div className={styles["saved-container"]}>
                    <div className={styles["deck-code-container"]}>
                        <div className={styles["input-container"]}>
                            <label className={styles.label} htmlFor="deck-code">
                                Deck Code
                            </label>
                            <input className={styles.input} type="text" value={deckCode} />
                        </div>
                        <Button handleClick={copyToClipboard} styling="clear" isDisabled={false}>
                            {copiedCode ? "Copied" : "Copy"}
                        </Button>
                    </div>
                    <div>
                        <Button handleClick={clearDeck} styling="clear" isDisabled={false}>
                            Reset Deck
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
