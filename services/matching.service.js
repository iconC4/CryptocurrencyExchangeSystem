import { Op, Transaction as SequelizeTx } from "sequelize";
import db from "../models/index.js";

const { Order, Transaction, Wallet } = db;

export const matchOrder = async(newOrder) => {
    const isBuy = newOrder.Order_Type === "buy";
    const oppositeType = isBuy ? "sell" : "buy";

    const candidates = await Order.findAll({
        where: {
            Order_Type: oppositeType,
            Crypto_Currency_Id: newOrder.Crypto_Currency_Id,
            Fiat_Currency_Id: newOrder.Fiat_Currency_Id,
            Status: "open",
            Price: isBuy ? {
                [Op.lte]: newOrder.Price,
            } : {
                [Op.gte]: newOrder.Price,
            },
        },
        order: [
            ["Created_At", "ASC"]
        ],
    });

    let remainingQty = newOrder.Quantity - newOrder.Filled_Amount;

    const t = await db.sequelize.transaction({
        isolationLevel: SequelizeTx.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
        for (const counter of candidates) {
            const counterRemain = counter.Quantity - counter.Filled_Amount;
            const tradeQty = Math.min(remainingQty, counterRemain);

            if (tradeQty <= 0) continue;

            await Transaction.create({
                Transaction_Id: `TX-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
                Buy_Order_Id: isBuy ? newOrder.Order_Id : counter.Order_Id,
                Sell_Order_Id: isBuy ? counter.Order_Id : newOrder.Order_Id,
                Amount: tradeQty,
                Price: counter.Price,
                Transaction_fee: 0,
            }, { transaction: t });

            counter.Filled_Amount += tradeQty;
            newOrder.Filled_Amount += tradeQty;

            if (counter.Filled_Amount >= counter.Quantity) counter.Status = "matched";
            if (newOrder.Filled_Amount >= newOrder.Quantity)
                newOrder.Status = "matched";

            await counter.save({ transaction: t });
            await newOrder.save({ transaction: t });

            await updateWalletsAfterMatch({
                buyerId: isBuy ? newOrder.User_Id : counter.User_Id,
                sellerId: isBuy ? counter.User_Id : newOrder.User_Id,
                cryptoId: newOrder.Crypto_Currency_Id,
                fiatId: newOrder.Fiat_Currency_Id,
                qty: tradeQty,
                price: counter.Price,
                tx: t,
            });

            remainingQty -= tradeQty;
            if (remainingQty <= 0) break;
        }

        await t.commit();
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

const updateWalletsAfterMatch = async({
    buyerId,
    sellerId,
    cryptoId,
    fiatId,
    qty,
    price,
    tx,
}) => {
    const buyerCrypto = await Wallet.findOne({ where: { User_Id: buyerId, Currency_Id: cryptoId } }, { transaction: tx });
    const buyerFiat = await Wallet.findOne({ where: { User_Id: buyerId, Currency_Id: fiatId } }, { transaction: tx });

    const sellerCrypto = await Wallet.findOne({ where: { User_Id: sellerId, Currency_Id: cryptoId } }, { transaction: tx });
    const sellerFiat = await Wallet.findOne({ where: { User_Id: sellerId, Currency_Id: fiatId } }, { transaction: tx });

    const totalFiat = qty * price;

    buyerCrypto.Balance += qty;
    buyerFiat.Balance -= totalFiat;
    sellerCrypto.Balance -= qty;
    sellerFiat.Balance += totalFiat;

    await Promise.all([
        buyerCrypto.save({ transaction: tx }),
        buyerFiat.save({ transaction: tx }),
        sellerCrypto.save({ transaction: tx }),
        sellerFiat.save({ transaction: tx }),
    ]);
};