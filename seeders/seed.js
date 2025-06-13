import db from "../models/index.js";

const seed = async() => {
    try {
        await db.sequelize.sync({ force: true });

        const user = await db.User.create({
            User_Id: "U001",
            UserName: "c4admin",
            Email: "c4@example.com",
            Password: "123456",
        });

        const btc = await db.Currency.create({
            Currency_Id: "BTC",
            Name: "Bitcoin",
            Type: "crypto",
        });

        const thb = await db.Currency.create({
            Currency_Id: "THB",
            Name: "Thai Baht",
            Type: "fiat",
        });

        await db.Wallet.create({
            Wallet_Id: "W001",
            User_Id: user.User_Id,
            Currency_Id: btc.Currency_Id,
            Address: "btc_wallet_address_001",
        });

        await db.Wallet.create({
            Wallet_Id: "W002",
            User_Id: user.User_Id,
            Currency_Id: thb.Currency_Id,
            Address: "thb_wallet_address_001",
        });

        console.log("Seed data successfully created.");
    } catch (error) {
        console.error("Seed error:", error);
    } finally {
        await db.sequelize.close();
    }
};

seed();