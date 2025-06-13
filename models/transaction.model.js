export default (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        "Transaction", {
            Transaction_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            Buy_Order_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Sell_Order_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Price: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Quantity: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Transaction_Fee: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Total: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            Executed_At: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        }, { tableName: "Transactions", timestamps: false }
    );

    Transaction.findWithOrders = function(id) {
        return this.findByPk(id, { include: ["BuyOrder", "SellOrder"] });
    };

    return Transaction;
};