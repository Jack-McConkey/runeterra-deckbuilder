import Image from "next/image";
import styles from "./CardFilters.module.css";

export default function Filter({
    onFilter,
    filterCategory,
    filterOption,
    active,
}: {
    onFilter: (filterCategory: string, filterOption: string | number) => void;
    filterCategory: string;
    filterOption: string | number;
    active: boolean;
}) {
    const handleClick = () => {
        onFilter(filterCategory, filterOption);
    };

    let imgSource = "";

    if (filterCategory === "regions" && typeof filterOption === "string")
        imgSource = `icon-${filterOption.replaceAll(" ", "").replace("&", "")}.webp`;
    if (filterCategory === "type" && typeof filterOption === "string")
        imgSource = `${filterOption.toLowerCase()}-icon.svg`;
    if (filterCategory === "rarity" && typeof filterOption === "string")
        imgSource = `${filterOption.toLowerCase()}-rarity-icon.svg`;
    if (filterCategory === "set" && typeof filterOption === "string")
        imgSource = `${filterOption}.webp`;

    let filterStyles = `${styles.filter} ${styles[`filter--${filterCategory}`]}`;
    if (active) filterStyles += ` ${styles["filter--active"]}`;
    let btnText = filterOption;
    if (filterOption === 8) btnText = "8+";
    if (filterOption === "Set6cde") btnText = "Set7";
    return (
        <div>
            <button className={filterStyles} onClick={handleClick}>
                {filterCategory !== "cost" && (
                    <Image
                        width={"50px"}
                        height={"50px"}
                        src={`https://res.cloudinary.com/dqppxtwa1/image/upload/icons/${imgSource.toLowerCase()}`}
                        alt=""
                        unoptimized={true}
                    />
                )}
                {btnText}
            </button>
        </div>
    );
}
