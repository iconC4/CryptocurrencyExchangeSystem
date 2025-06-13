import db from "../models/index.js";

const seed = async() => {
    try {
        await db.sequelize.sync({ force: true });

        const currencies = await db.Currency.bulkCreate([
            { Currency_Id: "THB", Name: "Thai Baht", Type: "fiat", Is_Active: true },
            { Currency_Id: "USD", Name: "US Dollar", Type: "fiat", Is_Active: true },
            { Currency_Id: "BTC", Name: "Bitcoin", Type: "crypto", Is_Active: true },
            { Currency_Id: "ETH", Name: "Ethereum", Type: "crypto", Is_Active: true },
            {
                Currency_Id: "DOGE",
                Name: "Dogecoin",
                Type: "crypto",
                Is_Active: true,
            },
            { Currency_Id: "XRP", Name: "Ripple", Type: "crypto", Is_Active: true },
        ]);

        const users = await db.User.bulkCreate([{
                User_Id: "U001",
                UserName: "buyer1",
                Email: "buyer1@example.com",
                Password: "pass123",
                Status: "active",
            },
            {
                User_Id: "U002",
                UserName: "seller1",
                Email: "seller1@example.com",
                Password: "pass123",
                Status: "active",
            },
        ]);

        const wallets = await db.Wallet.bulkCreate([{
                Wallet_Id: "W001",
                User_Id: "U001",
                Currency_Id: "THB",
                Address: "wallet-buyer1-thb",
                Balance: 1000000,
            },
            {
                Wallet_Id: "W002",
                User_Id: "U001",
                Currency_Id: "BTC",
                Address: "wallet-buyer1-btc",
                Balance: 0,
            },

            {
                Wallet_Id: "W003",
                User_Id: "U002",
                Currency_Id: "BTC",
                Address: "wallet-seller1-btc",
                Balance: 1,
            },
            {
                Wallet_Id: "W004",
                User_Id: "U002",
                Currency_Id: "THB",
                Address: "wallet-seller1-thb",
                Balance: 0,
            },
        ]);

        console.log("Seeding completed.");
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
};

seed();