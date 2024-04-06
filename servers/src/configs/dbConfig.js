import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { DB_NAME, DB_USER, DB_PASS, DB_DIALECT, DB_HOST } = process.env;
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: 3306,
  pool: {
    max: 50,
    min: 0,
    acquire: 1200000,
    idle: 1000000,
  },
});
export default db;
