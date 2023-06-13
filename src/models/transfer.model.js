const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfer = db.define('transfer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accountSender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountReceiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Transfer;
