import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
    fileURLToPath
} from 'url';
import {
    dirname,
    join
} from 'path';
import connectDB from "./config/db.js";
import gameRoutes from "./routes/gameRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import favRoutes from "./routes/favRoutes.js";
import rawgRoutes from "./routes/rawgRoutes.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: join(__dirname, '.env')
});
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favourites", favRoutes);
app.use("/api/rawg", rawgRoutes);

app.listen(process.env.PORT, () =>
    console.log("Backend running on port", process.env.PORT)
);