import Game from "../models/Game.js";

export const getGames = async (req, res) => {
    try {
        const {
            search,
            genre,
            minRating
        } = req.query;
        const query = {};

        if (search) query.title = {
            $regex: search,
            $options: "i"
        };
        if (genre && genre !== "All") query.genre = genre;
        if (minRating) query.rating = {
            $gte: minRating
        };

        const games = await Game.find(query);
        res.json(games);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const getGameById = async (req, res) => {
    const game = await Game.findById(req.params.id);
    res.json(game);
};

export const addGame = async (req, res) => {
    const game = await Game.create(req.body);
    res.json(game);
};