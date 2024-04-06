import { Sequelize } from "sequelize";
import db from "../configs/dbConfig.js";
import Candidate from "./CandidateModel.js";

const { DataTypes } = Sequelize;
const Experience = db.define("experience", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  CompanyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LastPosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Year: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  candidateId: { type: DataTypes.INTEGER },
});
Experience.belongsTo(Candidate, { foreignKey: "candidateId" });
Candidate.hasMany(Experience, {
  foreignKey: "candidateId",
  onDelete: "CASCADE",
});
export default Experience;
