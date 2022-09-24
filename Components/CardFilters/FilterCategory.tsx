import Filter from "./Filter";
import styles from "./CardFilters.module.css";

interface FitlerCategoryProps {
    filterCategory: string;
    filterOptions: string[] | number[];
    filterCallback: (filterCategory: string, filterOption: string | number) => void;
    selectedFilters: (string | number)[];
}

export default function FilterCategory({
    filterCategory,
    filterOptions,
    filterCallback,
    selectedFilters,
}: FitlerCategoryProps) {
    const filters = filterOptions.map((option: string | number, index: number) => {
        const isActive = selectedFilters.includes(option);
        return (
            <Filter
                filterCategory={filterCategory}
                active={isActive}
                filterOption={option}
                onFilter={filterCallback}
                key={index}
            />
        );
    });
    return (
        <div className={styles.category}>
            <h1 className={styles.title}>{filterCategory}</h1>
            <div className={styles.filters}>{filters}</div>
        </div>
    );
}
