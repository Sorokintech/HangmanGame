import styles from './Keyboard.module.css';

const KEYS = [
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'
]
type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
    disabled?: boolean
}

export function Keyboard  ({activeLetters, inactiveLetters, addGuessedLetter, disabled = false} : KeyboardProps) {
    return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>
        {KEYS.map(key => {
            const isActive = activeLetters.includes(key);
            const isInactive = inactiveLetters.includes(key);
            return <button onClick={() => addGuessedLetter(key)} className={`${styles.btn} ${isActive ? styles.active: ""} ${isInactive ? styles.inactive: ""}`} key={key} disabled={isActive || isInactive || disabled}>{key}
            </button>
        })}

    </div>
}