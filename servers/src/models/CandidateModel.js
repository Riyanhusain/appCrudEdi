import { Sequelize } from "sequelize";
import db from "../configs/dbConfig.js";

const { DataTypes } = Sequelize;
const Candidate = db.define("candidate", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  CandidatePosition: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  CandidteName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Nik: {
    type: DataTypes.BIGINT(25),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  PlaceOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  DateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Religion: {
    type: DataTypes.STRING,
  },
  BloodType: { type: DataTypes.STRING },
  CandidateStatus: { type: DataTypes.STRING },
  KtpAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  DomicileAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  PhoneNumber: {
    type: DataTypes.BIGINT(25),
    allowNull: false,
  },
  Bestie: {
    type: DataTypes.STRING,
  },
  Image: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});
export default Candidate;
