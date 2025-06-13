export default (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order", {
            Order_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            User_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Crypto_Currency_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Fiat_Currency_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Order_Type: {
                type: DataTypes.ENUM("buy", "sell"),
                allowNull: false,
            },
            Quantity: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Price: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Filled_Amount: {
                type: DataTypes.DECIMAL(18, 8),
                defaultValue: 0.0,
            },
            Status: {
                type: DataTypes.ENUM("open", "matched", "cancelled"),
                defaultValue: "open",
            },
            Created_At: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        }, { tableName: "Orders", timestamps: false }
    );

    Order.findOpenOrdersWithUser = function() {
        return this.findAll({
            where: { Status: "open" },
            include: ["User", "CryptoCurrency", "FiatCurrency"],
        });
    };

    return Order;
};