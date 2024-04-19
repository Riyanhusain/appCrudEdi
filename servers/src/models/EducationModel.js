import { Sequelize } from "sequelize";
import db from "../configs/dbConfig.js";
import Candidate from "./CandidateModel.js";

const { DataTypes } = Sequelize;

const Education = db.define("education", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  GradeTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SchoolName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Major: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GraduateYear: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  GPA: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  candidateId: { type: DataTypes.INTEGER },
});
Candidate.hasMany(Education, {
  foreignKey: "candidateId",
  onDelete: "CASCADE",
});
Education.belongsTo(Candidate, {
  foreignKey: "candidateId",
  onDelete: "CASCADE",
});
export default Education;
