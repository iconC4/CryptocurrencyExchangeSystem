import db from "../models/index.js";
const { Order } = db;

export const createOrder = async(req, res) => {
    try {
        const {
            Order_Id,
            User_Id,
            Crypto_Currency_Id,
            Fiat_Currency_Id,
            Order_Type,
            Quantity,
            Price,
        } = req.body;

        if (!Order_Type || !Quantity || !Price) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const order = await Order.create({
            Order_Id,
            User_Id,
            Crypto_Currency_Id,
            Fiat_Currency_Id,
            Order_Type,
            Quantity,
            Price,
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllOrders = async(req, res) => {
    const orders = await db.Order.findAll();
    res.json(orders);
};

export const getOrderByType = async(req, res) => {
    const { type } = req.params;
    console.log(type);
    if (!["buy", "sell"].includes(type)) {
        return res.status(400).json({ error: "Invalid order type." });
    }

    try {
        const orders = await Order.findAll({
            where: { Order_Type: type },
            include: ["User", "CryptoCurrency", "FiatCurrency"],
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};