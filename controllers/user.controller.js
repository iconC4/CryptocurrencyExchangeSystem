import db from "../models/index.js";

const { User, Wallet, Order, Transaction, Transfer } = db;

export const createUser = async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created", data: user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getUserById = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserWallets = async(req, res) => {
    try {
        const wallets = await Wallet.findAll({ where: { User_Id: req.params.id } });
        res.json(wallets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserOrders = async(req, res) => {
    try {
        const orders = await Order.findAll({ where: { User_Id: req.params.id } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserTransactions = async(req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [{
                    model: Order,
                    as: "BuyOrder",
                    where: { User_Id: req.params.id },
                    required: false,
                },
                {
                    model: Order,
                    as: "SellOrder",
                    where: { User_Id: req.params.id },
                    required: false,
                },
            ],
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserSentTransfers = async(req, res) => {
    try {
        const transfers = await Transfer.findAll({
            include: {
                model: Wallet,
                as: "FromWallet",
                where: { User_Id: req.params.id },
            },
        });
        res.json(transfers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserReceivedTransfers = async(req, res) => {
    try {
        const transfers = await Transfer.findAll({
            include: {
                model: Wallet,
                as: "ToWallet",
                where: { User_Id: req.params.id },
            },
        });
        res.json(transfers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};