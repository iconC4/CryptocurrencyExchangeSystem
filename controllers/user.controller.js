import db from "../models/index.js";

export const registerUser = async(req, res) => {
    try {
        const { User_Id, UserName, Email, Password } = req.body;
        const newUser = await db.User.create({ User_Id, UserName, Email, Password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async(req, res) => {
    const users = await db.User.findAll();
    res.json(users);
};