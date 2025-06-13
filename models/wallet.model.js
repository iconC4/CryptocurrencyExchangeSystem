export default (sequelize, DataTypes) => {
    const Wallet = sequelize.define(
        "Wallet", {
            Wallet_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            User_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Currency_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Balance: {
                type: DataTypes.DECIMAL(20, 8),
                allowNull: false,
                defaultValue: 0.0,
            },
        }, { tableName: "Wallets", timestamps: false }
    );

    Wallet.findWithUserAndCurrency = function(id) {
        return this.findByPk(id, { include: ["User", "Currency"] });
    };

    return Wallet;
};