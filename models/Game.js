import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: String,
    rating: Number,
    image: String
});

export default mongoose.model("Game", gameSchema);