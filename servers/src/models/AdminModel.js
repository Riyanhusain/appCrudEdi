import { Sequelize } from "sequelize";
import db from "../configs/dbConfig.js";

const { DataTypes } = Sequelize;
const Admin = db.define("admin", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  AdminName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Admin;
