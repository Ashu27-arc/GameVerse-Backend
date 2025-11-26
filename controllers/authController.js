import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const exists = await User.findOne({
        email
    });
    if (exists) return res.status(400).json({
        message: "Email exists"
    });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashed
    });

    res.json({
        message: "Registered",
        user
    });
};

export const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    });
    if (!user) return res.status(404).json({
        message: "Not found"
    });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({
        message: "Wrong pass"
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.json({
        message: "Login success",
        token,
        user
    });
};