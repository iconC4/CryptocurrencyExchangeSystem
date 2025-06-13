import db from "../models/index.js";

export const getWalletsByUser = async(req, res) => {
    try {
        const { userId } = req.params;

        const wallets = await db.Wallet.findAll({
            where: { User_Id: userId },
            include: [{ model: db.Currency }],
        });

        res.json(wallets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};