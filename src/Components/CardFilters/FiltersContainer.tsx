import {filterOptions} from "./filterOptions";
import {FilterOptions} from "../DeckBuilder/types";
import FilterCategory from "./FilterCategory";
import Modal from "../UI/Modal/Modal";
import styles from "./CardFilters.module.css";
import Button from "../UI/Button/Button";

interface FiltersContainerProps {
    filters: FilterOptions;
    updateFilters: (filterCategory: string, filterOption: string | number) => void;
    closeFilters: () => void;
}

export default function FiltersContainer({
    filters,
    updateFilters,
    closeFilters,
}: FiltersContainerProps) {
    return (
        <Modal style="filters-modal" handleClose={closeFilters}>
            <>
                <Button isDisabled={false} styling={"absolute-close"} handleClick={closeFilters}>
                    X
                </Button>
                {Object.entries(filterOptions).map(([category, options], index) => {
                    const selectedFilters = [...filters[category as keyof FilterOptions]];
                    return (
                        <FilterCategory
                            filterCategory={category}
                            filterOptions={options}
                            selectedFilters={selectedFilters}
                            key={index}
                            filterCallback={updateFilters}
                        />
                    );
                })}
                <div className={styles["btn-container"]}>
                    <Button isDisabled={false} styling="close" handleClick={closeFilters}>
                        Close
                    </Button>
                </div>
            </>
        </Modal>
    );
}
