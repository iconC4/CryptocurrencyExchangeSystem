export default (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        "Payment", {
            Payment_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            User_Id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Method_Type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Is_Verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, { tableName: "Payments", timestamps: false }
    );

    Payment.getByUser = function(userId) {
        return this.findAll({ where: { User_Id: userId } });
    };

    return Payment;
};