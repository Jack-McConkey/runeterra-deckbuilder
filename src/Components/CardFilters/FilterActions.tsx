import {useState} from "react";
import {FilterOptions} from "../DeckBuilder/types";
import Button from "../UI/Button/Button";
import {Actions} from "./filterHelpers";
import FiltersContainer from "./FiltersContainer";

interface FilterActionsProps {
    filters: FilterOptions;
    dispatchFilters: React.Dispatch<Actions<string | number>>;
    filterInvalidCards?: () => void;
    invalidCards?: boolean;
}

export default function FilterActions({
    filters,
    dispatchFilters,
    filterInvalidCards,
    invalidCards,
}: FilterActionsProps) {
    const [showFilters, setShowFilters] = useState(false);
    const filtering = () => {
        if (filters.cost.length > 0) return true;
        if (filters.regions.length > 0) return true;
        if (filters.rarity.length > 0) return true;
        if (filters.set.length > 0) return true;
        if (filters.type.length > 0) return true;
        return false;
    };

    const updateFilters = (filterCategory: string, filterOption: string | number) => {
        dispatchFilters({
            type: filterCategory as keyof FilterOptions | "clear",
            filterOption: [filterOption],
        });
    };

    return (
        <>
            <Button isDisabled={false} handleClick={() => setShowFilters(true)} key={1}>
                Show Filters
            </Button>
            <Button
                styling="clear"
                isDisabled={!filtering()}
                handleClick={() => {
                    dispatchFilters({type: "clear", filterOption: [""]});
                }}
                key={2}>
                Clear Filters
            </Button>
            {filterInvalidCards && (
                <Button
                    styling="clear"
                    isDisabled={!invalidCards}
                    handleClick={filterInvalidCards}
                    key={3}>
                    Hide Invalid Cards
                </Button>
            )}

            {showFilters && (
                <FiltersContainer
                    closeFilters={() => setShowFilters(false)}
                    filters={filters}
                    updateFilters={updateFilters}
                />
            )}
        </>
    );
}
