require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize( `postgres://${process.env.USER}:${process.env.PASS}@localhost:5432/${process.env.DBNAME}` , {
  dialect: "postgres", 
  logging: true, 
  host: 'localhost',
});

const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");
  } catch (error) {
    console.error("PostgreSQL connection error:", error.message);
    process.exit(1); 
  }
};

module.exports = { sequelize, connectionDB };

