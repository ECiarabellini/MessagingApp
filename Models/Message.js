const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Message extends Model {}


Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fromUser: {
            type: DataTypes.STRING(254),
            allowNull: false,
        },
        toUser: {
            type: DataTypes.STRING(254),
            allowNull: false,
        },
        subjectLine: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        bodyText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'message',
        tableName: 'messages' // Explicitly set to match the SQL
    }
);


module.exports = Message;