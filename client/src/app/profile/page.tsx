"use client"
import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react'
import { OTPInput } from 'input-otp'
import axios from 'axios';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


  const NUM_ROWS = 6;
  const NUM_COLS = 5;

function initialCellState(): initialCellState {
  return {
    letter: null,
    state: {}, // Define specific structure if known
  };
}

interface initialCellState {
  letter: null | string;
  state: Record<string, any>; // Define specific structure if known
}

interface GameState {
  data: {
    rows: [] // Replace 'any' with specific type if you know the row structure
    initialCellState: initialCellState
    currentRow: number;
    currentCol: number;
    gameOver: any;
    gameWon: any;
    wordToGuess: string | null;
    keyboardState: Record<string, any>; // Define specific structure if known
  };
}




export function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(newValue) => {
          if (newValue.length > value.length) {
            // Only allow adding one character if the slot is empty
            const lastChar = newValue[newValue.length - 1];
            const position = newValue.length - 1;
            if (!value[position]) {
              setValue(value.slice(0, position) + lastChar + value.slice(position + 1));
            }
          } else {
            // Allow deletion
            setValue(newValue);
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}



export default function page() {

  const [letter, setLetter] = useState('');

  // const chihaja = (e: React.) => {

  //   setLetter(e.valueOf);

  // }

  function Board() {
    return (
      <>

        <InputOTPControlled />

      </>
    )

  }

  // { gameOver, boardKey, letterCallback }

  interface KeyBoardProps {
    gameOver: boolean;
    letters: { keyboardClassName: string }[];
    letterCallback: (letter: string) => void;
  }

  function getIndexOfLetter(letter: any) {
    return letter.charCodeAt(0) - 'A'.charCodeAt(0);
  }



  function KeyBoard({ gameOver, letters, letterCallback }: KeyBoardProps) {

    const keyArrangement = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]

    return (
      <>
        {
          keyArrangement.map((row, index) => (
            <div key={'row_' + index} className='flex justify-center items-center'>
              {
                row.map((letter, letterIndex) => (
                  <button
                    key={'letter_' + letterIndex}
                    className='w-[40px] h-[40px] flex justify-center items-center bg-amber-200 rounded-[3px] border-1 border-black m-1'
                  >
                    <span className='text-black text-[20px] font-semibold'>{letter}</span>
                  </button>
                ))
              }
            </div>
          ))
        }
        <div className="col-12 text-center">
          <button style={{ 'margin': '2px' }} className='btn btn-light' onClick={() => { return 0 }} disabled={gameOver}>
            ENTER
          </button>
          <button style={{ 'margin': '2px' }} className='btn btn-light' onClick={() => { return 0 }} disabled={gameOver}>
            BACKSPACE
          </button>
        </div>
      </>
    );
  }

  const [mounted, setMounted] = useState({});



  const [gameState, setGameState] = useState<GameState | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/users/game-state-manager");

        if (respone.status === 200) {
          setGameState(respone.data);
        }

        else {
          console.error('Unexpected response status:', respone.status);
        }

      }
      catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.error('Unauthorized: Invalid credentials');
        }

        else if (axios.isAxiosError(error)) {
        }

        else {
          console.error('Unexpected error:', error);
        }
      }
    }
    fetchData();
  }, [])



  console.log('gameState', gameState?.data);






  return (
    <div className="bg-[#f8f8f8f1] flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className='grid grid-cols-5 justify-items-center items-center gap-3'>

        <Board />

      </div>

      <div>
        <KeyBoard
          gameOver={false}
          letters={[{ keyboardClassName: 'btn-default' }]}
          letterCallback={(letter: string) => console.log(letter)}
        />

      </div>


    </div>
  )
}
