import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "./models/Game.js";

dotenv.config();

const sampleGames = [{
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        rating: 9.5,
        releaseDate: "2015-05-19",
        description: "An epic open-world RPG adventure",
        imageUrl: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
    },
    {
        title: "Red Dead Redemption 2",
        genre: "Action",
        rating: 9.3,
        releaseDate: "2018-10-26",
        description: "An epic tale of life in America's unforgiving heartland",
        imageUrl: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
    },
    {
        title: "God of War",
        genre: "Action",
        rating: 9.4,
        releaseDate: "2018-04-20",
        description: "A father and son journey through Norse mythology",
        imageUrl: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"
    },
    {
        title: "Cyberpunk 2077",
        genre: "RPG",
        rating: 8.5,
        releaseDate: "2020-12-10",
        description: "An open-world action-adventure set in Night City",
        imageUrl: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
    },
    {
        title: "Elden Ring",
        genre: "RPG",
        rating: 9.2,
        releaseDate: "2022-02-25",
        description: "A dark fantasy action RPG",
        imageUrl: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg"
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        await Game.deleteMany({});
        await Game.insertMany(sampleGames);
        console.log("Sample games added!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });