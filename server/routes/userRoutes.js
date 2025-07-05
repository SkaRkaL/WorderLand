import express from "express";
import { registerUser, loginUser, allUsers, deleteAllUsers, gameStateManager } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allusers", allUsers);
router.delete("/delete/all", deleteAllUsers);
router.get('/game-state-manager', gameStateManager);

export default router;