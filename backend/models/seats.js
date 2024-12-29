const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Seat = sequelize.define("Seat", {
  seatnumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isbooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rownumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "seats",
  timestamps: false, 
});

module.exports = Seat;
