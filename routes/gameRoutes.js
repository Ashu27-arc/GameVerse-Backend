import express from "express";
import {
    getGames,
    addGame,
    getGameById
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGameById);
router.post("/", addGame);

export default router;