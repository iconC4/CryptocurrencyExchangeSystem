import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "sqlite",
    logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

import CurrencyModel from "./currency.model.js";
import UserModel from "./user.model.js";
import WalletModel from "./wallet.model.js";
import PaymentModel from "./payment.model.js";
import OrderModel from "./order.model.js";
import TransactionModel from "./transaction.model.js";
import TransferModel from "./transfer.model.js";

db.Currency = CurrencyModel(sequelize, DataTypes);
db.User = UserModel(sequelize, DataTypes);
db.Wallet = WalletModel(sequelize, DataTypes);
db.Payment = PaymentModel(sequelize, DataTypes);
db.Order = OrderModel(sequelize, DataTypes);
db.Transaction = TransactionModel(sequelize, DataTypes);
db.Transfer = TransferModel(sequelize, DataTypes);

db.User.hasMany(db.Payment, { foreignKey: "User_Id" });
db.Payment.belongsTo(db.User, { foreignKey: "User_Id" });

db.User.hasMany(db.Wallet, { foreignKey: "User_Id", as: "Wallets" });
db.Wallet.belongsTo(db.User, { foreignKey: "User_Id", as: "User" });

db.User.hasMany(db.Order, { foreignKey: "User_Id", as: "Orders" });
db.Order.belongsTo(db.User, { foreignKey: "User_Id", as: "User" });

db.Currency.hasMany(db.Wallet, { foreignKey: "Currency_Id" });
db.Wallet.belongsTo(db.Currency, { foreignKey: "Currency_Id" });

db.Currency.hasMany(db.Order, {
    foreignKey: "Crypto_Currency_Id",
    as: "CryptoOrders",
});
db.Currency.hasMany(db.Order, {
    foreignKey: "Fiat_Currency_Id",
    as: "FiatOrders",
});

db.Order.belongsTo(db.Currency, {
    foreignKey: "Crypto_Currency_Id",
    as: "CryptoCurrency",
});
db.Order.belongsTo(db.Currency, {
    foreignKey: "Fiat_Currency_Id",
    as: "FiatCurrency",
});

db.Order.hasMany(db.Transaction, {
    foreignKey: "Buy_Order_Id",
    as: "BuyTransactions",
});
db.Order.hasMany(db.Transaction, {
    foreignKey: "Sell_Order_Id",
    as: "SellTransactions",
});

db.Transaction.belongsTo(db.Order, {
    foreignKey: "Buy_Order_Id",
    as: "BuyOrder",
});
db.Transaction.belongsTo(db.Order, {
    foreignKey: "Sell_Order_Id",
    as: "SellOrder",
});

db.Transfer.belongsTo(db.Wallet, {
    foreignKey: "From_Wallet_Id",
    as: "FromWallet",
});
db.Transfer.belongsTo(db.Wallet, {
    foreignKey: "To_Wallet_Id",
    as: "ToWallet",
});

db.Wallet.hasMany(db.Transfer, {
    foreignKey: "From_Wallet_Id",
    as: "OutgoingTransfers",
});
db.Wallet.hasMany(db.Transfer, {
    foreignKey: "To_Wallet_Id",
    as: "IncomingTransfers",
});

db.Transfer.belongsTo(db.Currency, {
    foreignKey: "Currency_Id",
    as: "Currency",
});
db.Currency.hasMany(db.Transfer, { foreignKey: "Currency_Id" });

export default db;