import { Sequelize } from "sequelize";
import db from "../configs/dbConfig.js";
import Candidate from "./CandidateModel.js";

const { DataTypes } = Sequelize;
const Tranning = db.define("tranning", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  TranningName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Sertification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  TranningYear: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  candidateId: { type: DataTypes.INTEGER },
});
Tranning.belongsTo(Candidate, {
  foreignKey: "candidateId",
  onDelete: "CASCADE",
});
Candidate.hasMany(Tranning, { foreignKey: "candidateId" });
export default Tranning;
