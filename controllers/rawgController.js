import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API = "https://api.rawg.io/api/games";
const KEY = process.env.RAWG_KEY;

export const getTrending = async (req, res) => {
    try {
        const {
            search,
            page = 1,
            page_size = 40
        } = req.query;
        let url = `${API}?key=${KEY}&ordering=-added&page=${page}&page_size=${page_size}`;
        if (search) url += `&search=${search}`;

        const {
            data
        } = await axios.get(url);
        res.json(data.results);
    } catch (err) {
        console.error("RAWG API Error:", err.response ? err.response.data : err.message);
        res.status(500).json({
            message: "Failed to fetch trending games",
            error: err.message
        });
    }
};

export const getUpcoming = async (req, res) => {
    try {
        const {
            search,
            page = 1,
            page_size = 40
        } = req.query;
        const today = new Date().toISOString().split('T')[0];
        let url = `${API}?key=${KEY}&dates=${today},2026-12-31&ordering=-added&page=${page}&page_size=${page_size}`;
        if (search) url += `&search=${search}`;

        const {
            data
        } = await axios.get(url);
        res.json(data.results);
    } catch (err) {
        console.error("RAWG API Error:", err.response ? err.response.data : err.message);
        res.status(500).json({
            message: "Failed to fetch upcoming games",
            error: err.message
        });
    }
};

export const getTopRated = async (req, res) => {
    try {
        const {
            search,
            page = 1,
            page_size = 40
        } = req.query;
        let url = `${API}?key=${KEY}&ordering=-rating&page=${page}&page_size=${page_size}`;
        if (search) url += `&search=${search}`;

        const {
            data
        } = await axios.get(url);
        res.json(data.results);
    } catch (err) {
        console.error("RAWG API Error:", err.response ? err.response.data : err.message);
        res.status(500).json({
            message: "Failed to fetch top rated games",
            error: err.message
        });
    }
};

export const getGameDetails = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const url = `${API}/${id}?key=${KEY}`;

        const {
            data
        } = await axios.get(url);

        // Extract store links and platforms
        const gameDetails = {
            id: data.id,
            name: data.name,
            description: data.description_raw,
            released: data.released,
            rating: data.rating,
            background_image: data.background_image,
            platforms: data.platforms ? data.platforms.map(p => ({
                name: p.platform.name,
                slug: p.platform.slug
            })) : [],
            stores: data.stores ? data.stores.map(s => ({
                id: s.store.id,
                name: s.store.name,
                url: s.url || `https://${s.store.domain}`
            })) : [],
            genres: data.genres ? data.genres.map(g => g.name) : [],
            developers: data.developers ? data.developers.map(d => d.name) : [],
            publishers: data.publishers ? data.publishers.map(p => p.name) : [],
            website: data.website,
            metacritic: data.metacritic
        };

        res.json(gameDetails);
    } catch (err) {
        console.error("RAWG API Error:", err.response ? err.response.data : err.message);
        res.status(500).json({
            message: "Failed to fetch game details",
            error: err.message
        });
    }
};