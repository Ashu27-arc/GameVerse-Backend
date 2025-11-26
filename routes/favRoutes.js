import express from "express";
import {
    protect
} from "../middleware/authMiddleware.js";
import {
    addFavourite,
    getFavourites
} from "../controllers/favController.js";

const router = express.Router();

router.post("/", protect, addFavourite);
router.get("/", protect, getFavourites);

export default router;