import express from "express";
import {
    getTrending,
    getUpcoming,
    getTopRated,
    getGameDetails
} from "../controllers/rawgController.js";

const router = express.Router();

router.get("/trending", getTrending);
router.get("/upcoming", getUpcoming);
router.get("/top-rated", getTopRated);
router.get("/game/:id", getGameDetails);

export default router;