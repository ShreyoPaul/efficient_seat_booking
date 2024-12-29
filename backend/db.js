require("dotenv").config();
const { Sequelize } = require("sequelize")
const { PostgresDialect } = require("@sequelize/postgres")

const sequelize = new Sequelize(process.env.SUPABASE_POSTGRESQL_DB_URL, {
  dialect: PostgresDialect,
  logging: false,
  define: {
    timestamps: false,
  },
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
