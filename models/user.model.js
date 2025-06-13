export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            User_Id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            UserName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM("active", "inactive"),
                defaultValue: "active",
            },
        }, { tableName: "Users", timestamps: false }
    );

    User.findByIdWithRelations = function(id) {
        return this.findByPk(id, {
            include: ["Wallets", "Orders", "Payments"],
        });
    };

    return User;
};