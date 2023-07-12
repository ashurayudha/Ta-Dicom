import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Doctors from "./DoctorModel.js";

const { DataTypes } = Sequelize;

const Patients = db.define("patients", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  medicalRecordNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  birthDate: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  profileImage: {
    type: DataTypes.STRING,
    defaultValue: "images/init-profile.png",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  disease: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: true,
    },
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: true,
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: false,
    },
  },

  // dicomFile: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   defaultValue: null,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Users.hasMany(Patients);
Patients.belongsTo(Users, { foreignKey: "userId" });

Doctors.hasMany(Patients);
Patients.belongsTo(Doctors, { foreignKey: "doctorId" });
export default Patients;
