export const addFavourite = async (req, res) => {
    const {
        gameId
    } = req.body;

    if (req.user.favourites.includes(gameId))
        return res.json({
            message: "Already in favourites"
        });

    req.user.favourites.push(gameId);
    await req.user.save();

    res.json({
        message: "Added!"
    });
};

export const getFavourites = async (req, res) => {
    const user = await req.user.populate("favourites");
    res.json(user.favourites);
};