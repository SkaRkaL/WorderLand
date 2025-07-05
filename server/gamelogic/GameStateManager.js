const NUM_ROWS = 6;
const NUM_COLS = 5;


const CELL_STATE = {
  default: {
    buttonClassName: "btn-default",
    keyboardClassName: "btn-light",
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

function initialCellState() {
  return {
    letter : null,
    state: CELL_STATE.default
  }
}

export function initialGameState() {
  return {
    cellState: initialCellState,
    rows: Array.from({ length: NUM_ROWS }, () => Array.from({ length: NUM_COLS }, () => initialCellState())),
    currentRow: 0,
    currentCol: 0,
    gameOver: false,
    gameWon: false,
    wordToGuess: null,
    keyboardState: {},
  };
}