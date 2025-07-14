"use client"
import React, { HTMLInputTypeAttribute, useCallback, useEffect, useState } from 'react'
// import axios from 'axios';
import HowToPlay from '../components/HowToPlay';


const NUM_ROWS = 6;
const NUM_COLS = 5;

function getIndexOfLetter(letter: any) {
  console.log('click --> ', letter);
  return letter.charCodeAt(0) - 'A'.charCodeAt(0);
}


const CELL_STATE = {
  default: {
    buttonClassName: "btn-default",
    keyboardClassName: "bg-[#000000]",
  },
  correct: {
    buttonClassName: "btn-warning",
    keyboardClassName: "btn-warning",
  },
  correctPosition: {
    buttonClassName: "btn-success",
    keyboardClassName: "btn-success",
  },
  incorrect: {
    buttonClassName: "btn-secondary",
    keyboardClassName: "btn-secondary",
  },
}




// const gameState = {
//   rows: Array.from({ length: NUM_ROWS }, () => Array.from({ length: NUM_COLS }, () => initialCellState())),
//   // initialCellState: initialCellState(), // Call the function if you want the value, or remove if not needed
//   currentRow: 0,
//   currentCol: 0,
//   gameOver: false,
//   gameWon: false,
//   wordToGuess: null,
//   keyboardState: {},
// };


function initialCellState() {
  return {
    letter: null,
    state: CELL_STATE.default
  }
}


function getRandomWord() {
  const words = ["APPLE", "BANAN", "CHERY", "GRAPE", "LEMON"];
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}


function initialGameState() {
  return {
    chosenWord: getRandomWord(),
    rows: Array(NUM_ROWS).fill(Array(NUM_COLS).fill(initialCellState())),
    letters: Array(26).fill(CELL_STATE.default),
    currentRow: 0,
    currentCol: 0,
    gameOver: false,
  }
}

const getColors = (solution: any, word: any) => {
  // Create a copy of the solution to track matches
  const solutionLetters = solution.split("");
  
  // Create an array to track the state of each position
  const result = Array(5).fill("bg-[#3a3a3c]"); // Default to gray

  // First pass: Mark exact matches (green)
  for (let i = 0; i < word.length; i++) {
    if (word[i] === solutionLetters[i]) {
      result[i] = "bg-green-700";
      // Mark this letter as used
      solutionLetters[i] = "*";
    }
  }

  // Second pass: Mark letters in wrong position (yellow)
  for (let i = 0; i < word.length; i++) {
    // Skip already matched positions
    if (result[i] === "bg-green-700") continue;

    const index = solutionLetters.indexOf(word[i]);
    if (index !== -1) {
      result[i] = "bg-[#b59f3b]"; // Yellow
      // Mark this letter as used
      solutionLetters[index] = "+";
    }
  }

  return result;
};

const Row = ({ word, solution, isFinished }: any) => {
  const colors = isFinished ? getColors(solution, word) : new Array(5).fill("");

  return new Array(5).fill("").map((_, idx) => (
    <div className={`board__cell ${colors[idx]}`} key={idx}>
      {word[idx] ?? ""}
    </div>
  ));
};

const Board = ({ hidden, guesses, currentWord, currentRow, solution }: any) => (
  <div className="board">
    {guesses.map((_: any, rowIdx: any) => (
      <div key={rowIdx} className={`board__row ${hidden}`} >
        <Row
          solution={solution}
          word={currentRow === rowIdx ? currentWord : guesses[rowIdx]}
          isFinished={currentRow > rowIdx}
        />
      </div>
    ))}
  </div>
);


export default function page() {

  const [solution, setSolution] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [guesses, setGuesses] = useState(new Array(6).fill(""));

  const getColor = (letter: any, solution: any, guesses: any) => {
    // Get all finished guesses (exclude empty strings)
    const finishedGuesses = guesses.filter((guess: string) => guess.length === 5);

    // If letter hasn't been guessed yet, return default color
    if (!finishedGuesses.some((guess: string) => guess.includes(letter))) {
      return "bg-[#818384]"; // default keyboard color
    }

    // Check if letter is in correct position (green)
    for (let guess of finishedGuesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter && solution[i] === letter) {
          return "bg-green-700";
        }
      }
    }

    // Check if letter is in word but wrong position (yellow)
    if (solution.includes(letter)) {
      return "bg-[#b59f3b]";
    }

    // Letter is not in word (gray)
    return "bg-[#3a3a3c]";
  };

  // Update the KeyBoard component to properly apply colors
  function KeyBoard({ hidden, solution, letters, guesses, onClick }: any) {
    const keyArrangement = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '-'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '+']
    ]

    return (
      <>
        {
          keyArrangement.map((row, index) => (
            <div key={'row_' + index} className={`flex justify-center items-center ${hidden} `}>
              {row.map((letter, letterIdx) => {
                if (letter === "+")
                  return (
                    <div key={letterIdx}
                      className={`w-[50px] h-[50px] flex justify-center items-center cursor-pointer bg-[#818384] rounded-[3px] m-1`}
                    >
                      <img src="Enter.svg" onClick={() => onClick("+")} />
                    </div>
                  );
                if (letter === "-")
                  return (
                    <div key={letterIdx}
                      className={`w-[50px] h-[50px] flex justify-center items-center cursor-pointer bg-[#818384] rounded-[3px] m-1`}
                    >
                      <img src="BackSpace.svg" onClick={() => onClick("-")} />
                    </div>
                  );

                const displayValue = letter;
                const letterColor = getColor(letter, solution, guesses);

                return (
                  <div
                    key={letterIdx}
                    className={`w-[40px] h-[50px] flex justify-center items-center cursor-pointer ${letterColor} rounded-[3px] font-semibold text-lg text-white m-1`}
                    onClick={() => onClick(letter)}
                  >
                    {displayValue}
                  </div>
                );
              })}
            </div>
          ))
        }
      </>
    );
  }



  // const [gameState, setGameState] = useState(initialGameState());

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const respone = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/users/game-state-manager");

  //       if (respone.status === 200) {
  //         // setGameState(respone.data);
  //       }

  //       else {
  //         console.error('Unexpected response status:', respone.status);
  //       }

  //     }
  //     catch (error: any) {
  //       if (axios.isAxiosError(error) && error.response?.status === 401) {
  //         console.error('Unauthorized: Invalid credentials');
  //       }

  //       else if (axios.isAxiosError(error)) {
  //       }

  //       else {
  //         console.error('Unexpected error:', error);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [])



  useEffect(() => {
    setSolution(getRandomWord());
  }, []);

  const merge = (letters: any, word: any) => {
    return Array.from(new Set(letters + word)).join("");
  };

  const [letters, setLetters] = useState("");
  const [currentRow, setCurrentRow] = useState(0);


  // we use useCallback to memoize or cache the function so that it doesn't get recreated on every render
  const processKey = useCallback((key: any) => {
    if (key === "-" && currentWord.length) {
      setCurrentWord((currentWord) => currentWord.slice(0, -1));
      return;
    }

    if ((key === "+") && currentWord.length === 5) {

      setGuesses((guesses) =>
        guesses.map((guess, idx) =>
          idx === currentRow ? currentWord : guess
        )
      );
      setCurrentRow((currentRow) => currentRow + 1);
      setLetters((letters) => merge(letters, currentWord));
      setCurrentWord("");
      return;
    }

    if (/^[A-Za-z]$/.test(key) && currentWord.length < 5) {
      setCurrentWord((currentWord) => currentWord + key.toUpperCase());
    }
  }, [currentWord, currentRow])


  let i: number = 0

  useEffect(() => {
    // console.log("guesses => " + i + " ", guesses);
    i += 1;
  }, [guesses])

  const [flag, setFlag] = useState(0);
  const [gameOver, setGameOver] = useState(1);
  const [hidden, setHidden] = useState("");



  useEffect(() => {

    if (guesses[currentRow - 1] === solution && solution) {
      setGameOver(1);
      setHidden("hidden")
    }
    else if (currentRow > 5) {
      setGameOver(2);
      setHidden("hidden")
    }


  }, [currentRow, solution, guesses])



  console.log('solution --> ', solution);
  return (
    <div className="bg-[#121213] flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className='w-screen h-[80px] border-b border-b-[#3a3a3c] absolute top-0' >\
        <div className='w-screen flex justify-between items-center '>
          <div className='border-1 border-[#3a3a3c] w-[40px] h-[40px] ml-20 rounded-[50px] cursor-pointer  flex justify-center items-center text-[20px] text-white  font-bold'
            onClick={() => { setFlag(1) }}
          >
            ?
          </div>
          <div className='border-1 border-[#3a3a3c] w-[40px] h-[40px] mr-20 rounded-[50px] cursor-pointer flex justify-center items-center text-[20px] text-white font-bold'
            onClick={() => { setFlag(2) }}
          >
            ...
          </div>
        </div>
      </div>

      <div className=' flex flex-col items-center justify-center w-full h-full gap-10 mt-[80px] relative'>

        {
          flag === 1 && <HowToPlay setFlag={setFlag} />
        }
        {
          flag === 2 && <HowToPlay setFlag={setFlag} />
        }

        {/* {
          gameOver === 1 && <div className='w-[300px] h-[300px] absolute left-0 top-0 back drop-blur-[4px] bg-black p-10 m-3'> <h1 className='text-4xl text-white text-center'>Congratulations</h1> </div>
        }
        {
          gameOver === 2 && <div className='w-[300px] h-[300px] absolute left-0 top-0 back drop-blur-[4px] bg-black p-10 m-3'> <h1 className='text-4xl text-white'>you lose</h1> </div>
        } */}

        <Board
          hidden={hidden}
          guesses={guesses}
          currentWord={currentWord}
          currentRow={currentRow}
          solution={solution}
        />

        <div>
          <KeyBoard
            hidden={hidden}
            solution={solution}
            guesses={guesses}
            letters={letters}
            onClick={processKey}
          />
        </div>
      </div>

    </div>
  )
}
