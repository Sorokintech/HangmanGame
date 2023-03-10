import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./components/HandhmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";
import words from './wordList.json';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getWord () {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongKeyboardLetters, setWrongKeyboardLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const addGuessedLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, isWinner])
  const addWrongKeyboardLetters = useCallback((letter: string) => {
    if(wrongKeyboardLetters.includes(letter)) return 

    setWrongKeyboardLetters(currentLetters => [...currentLetters, letter])
  }, [wrongKeyboardLetters])

  useEffect(() => {
    const handler  = (e: KeyboardEvent) => {
      const key = e.key;
      if(!key.match(/^[а-я]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    
    } 

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    } 
  }, [guessedLetters])
  useEffect(() => {
    const handler  = (e: KeyboardEvent) => {
      const key = e.key;
      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addWrongKeyboardLetters(key)
      toast.warn('Пожалуйста, смените раскладку клавиатуры', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } 

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    } 
  }, [wrongKeyboardLetters])

  useEffect(() => {
    const handler  = (e: KeyboardEvent) => {
      const key = e.key;
      if(key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])
   return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"

    }}>
      <div style={{fontSize: "2rem", textAlign: "center"}}>
        {isWinner && "Молодец! нажмите Enter чтобы начать новую игру"}
        {isLoser && "Вы старались - нажмите Enter чтобы начать новую игру"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{ alignSelf: "stretch"}}>
        <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
        <ToastContainer
            position="top-center"
            autoClose={1000}
            transition={Flip}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
      </div>
      
    </div>
   )
}

export default App
