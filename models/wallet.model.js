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
        }, { tableName: "Wallets", timestamps: false }
    );

    Wallet.findWithUserAndCurrency = function(id) {
        return this.findByPk(id, { include: ["User", "Currency"] });
    };

    return Wallet;
};