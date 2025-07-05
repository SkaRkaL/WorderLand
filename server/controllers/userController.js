import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Login user
// @route   POST /api/users/login
// @access  Public

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await (User.findOne({ email }) || User.findOne({ usename: username }));

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all users
// @route   GET /api/users
// @access  Public


const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Delete all users
// @route   DELETE /api/users
// @access  Admin

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Game state manager
// @route   GET /api/users/game-state
// @access  Public

const gameStateManager = (req, res) => {

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

  const gameState = {
    rows: Array.from({ length: NUM_ROWS }, () => Array.from({ length: NUM_COLS }, () => initialCellState())),
    initialCellState: initialCellState(), // Call the function if you want the value, or remove if not needed
    currentRow: 0,
    currentCol: 0,
    gameOver: false,
    gameWon: false,
    wordToGuess: null,
    keyboardState: {},
  };

  try {
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export { registerUser, loginUser, allUsers, deleteAllUsers, gameStateManager };
