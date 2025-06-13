import { Sequelize } from 'sequelize';
require('dotenv').config();

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'sqlite',
    storage: './data/database.sqlite',
    logging: false
});

export default sequelize;