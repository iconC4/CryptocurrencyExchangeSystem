export default (sequelize, DataTypes) => {
    const Transfer = sequelize.define(
        "Transfer", {
            Transfer_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            Frome_Wallet_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            To_Wallet_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Currency_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Amount: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Type: {
                type: DataTypes.ENUM("internal", "external"),
                allowNull: false,
            },
            Timestamp: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        }, { tableName: "Transfers", timestamps: false }
    );

    Transfer.findWithWallets = function(id) {
        return this.findByPk(id, {
            include: ["FromWallet", "ToWallet", "Currency"],
        });
    };

    return Transfer;
};