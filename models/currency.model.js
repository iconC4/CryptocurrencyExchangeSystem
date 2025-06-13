export default (sequelize, DataTypes) => {
    const Currency = sequelize.define(
        "Currency", {
            Currency_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Type: {
                type: DataTypes.ENUM("fiat", "crypto"),
                allowNull: false,
            },
            Is_Active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        }, {
            tableName: "Currencies",
            timestamps: false,
        }
    );

    Currency.getActiveCurrencies = function() {
        return this.findAll({ where: { Is_Active: true } });
    };

    return Currency;
};