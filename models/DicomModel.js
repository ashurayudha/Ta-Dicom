import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Patients from "./PatientModel.js";
// import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Dicoms = db.define("dicoms", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dicomFile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Patients.hasMany(Dicoms);
Dicoms.belongsTo(Patients, { foreignKey: "patientId" });

export default Dicoms;
