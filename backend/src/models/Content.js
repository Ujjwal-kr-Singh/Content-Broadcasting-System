const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Content = sequelize.define("Content", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_type: DataTypes.STRING,
    file_size: DataTypes.INTEGER,

    uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },

    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending"
    },

    rejection_reason: DataTypes.TEXT,
    approved_by: DataTypes.INTEGER,
    approved_at: DataTypes.DATE,

    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE

}, {
    timestamps: true
});

module.exports = Content;