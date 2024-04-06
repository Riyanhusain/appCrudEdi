import { Sequelize } from "sequelize";
import db from "../configs/dbConfig.js";
import Candidate from "./CandidateModel.js";
import Admin from "./AdminModel.js";

const { DataTypes } = Sequelize;
const Users = db.define("users", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  UserEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  Role: {
    type: DataTypes.STRING,
  },
  refreshToken: { type: DataTypes.TEXT },
  candidateId: { type: DataTypes.INTEGER },
  adminId: { type: DataTypes.INTEGER },
});

Users.belongsTo(Candidate, { foreignKey: "candidateId" });
Candidate.hasOne(Users, { foreignKey: "candidateId" });
Users.belongsTo(Admin, { foreignKey: "adminId" });
Admin.hasOne(Users, { foreignKey: "adminId" });
export default Users;
