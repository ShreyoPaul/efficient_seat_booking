require("dotenv").config();
const { Sequelize } = require("sequelize")
const { PostgresDialect } = require("@sequelize/postgres")

const sequelize = new Sequelize(process.env.SUPABASE_POSTGRESQL_DB_URL, {
  dialect: PostgresDialect,
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  },
  logging: false, // Disable logging in production
})

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
