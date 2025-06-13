import db from "../models/index.js";

export const transfer = async(req, res) => {
    try {
        const { Transfer_Id, Frome_Wallet_Id, To_Wallet_Id, Currency_Id, Amount } =
        req.body;

        const fromWallet = await db.Wallet.findByPk(Frome_Wallet_Id);
        const toWallet = await db.Wallet.findByPk(To_Wallet_Id);

        if (!fromWallet || !toWallet)
            return res.status(404).json({ message: "Wallet not found" });

        const newTransfer = await db.Transfer.create({
            Transfer_Id,
            Frome_Wallet_Id,
            To_Wallet_Id,
            Currency_Id,
            Amount,
        });

        res.status(201).json(newTransfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};