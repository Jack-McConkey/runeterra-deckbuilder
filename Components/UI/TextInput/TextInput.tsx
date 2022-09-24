import styles from "./TextInput.module.css";

interface TextInputProps {
    labelText: string;
    inputId: string;
    value: string;
    setValue: (value: React.SetStateAction<string>) => void;
}

export default function TextInput({labelText, inputId, value, setValue}: TextInputProps) {
    return (
        <div className={styles["input-container"]}>
            <label htmlFor={inputId}>{labelText}</label>
            <input
                className={styles.input}
                type="text"
                id={inputId}
                name={inputId}
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value.toLowerCase());
                }}
            />
        </div>
    );
}
