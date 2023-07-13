import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const Doctors = db.define("doctors", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  strNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  specialization: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  practicePlace: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  note: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  // dokter: {
  //   type: DataTypes.STRING,
  //   defaultValue: null,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
});

Users.hasOne(Doctors);
Doctors.belongsTo(Users, { foreignKey: "userId" });

export default Doctors;
