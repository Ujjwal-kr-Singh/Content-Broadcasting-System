const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
    // production / deployment
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // local development
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: "postgres",
            logging: false
        }
    );
}

module.exports = sequelize;