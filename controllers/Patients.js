import Patients from "../models/PatientModel.js";
import User from "../models/UserModel.js";
import Doctors from "../models/DoctorModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Dicoms from "../models/DicomModel.js";

// get all patients
export const getPatients = async (req, res) => {
  try {
    let response;
    if (req.roleId === 1) {
      response = await Patients.findAll({
        attributes: [
          "id",
          "uuid",
          "name",
          "medicalRecordNumber",
          "birthDate",
          "gender",
          "profileImage",
          "phoneNumber",
          "email",
          "address",
          "disease",
          "note",
          "userId",
          "doctorId",
          "createdAt",
          "updatedAt",
        ],
        // ada relasi
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "roleId"],
          },
          {
            model: Dicoms,
            attributes: ["id", "dicomFile", "createdAt", "updatedAt"],
          },
          {
            model: Doctors,
            attributes: [
              "id",
              "uuid",
              "userId",
              "strNumber",
              "birthDate",
              "address",
              "specialization",
              "practicePlace",
              "note",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: User,
                attributes: ["id", "uuid", "name"],
              },
            ],
          },
        ],
      });
    } else {
      response = await Patients.findAll({
        attributes: [
          "id",
          "uuid",
          "name",
          "medicalRecordNumber",
          "birthDate",
          "gender",
          "profileImage",
          "phoneNumber",
          "email",
          "address",
          "disease",
          "note",
          "userId",
          "doctorId",
          "createdAt",
          "updatedAt",
        ],
        where: { userId: req.userId },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "roleId"],
          },
          {
            model: Dicoms,
            attributes: ["id", "dicomFile", "createdAt", "updatedAt"],
          },
          {
            model: Doctors,
            attributes: [
              "id",
              "uuid",
              "userId",
              "strNumber",
              "birthDate",
              "address",
              "specialization",
              "practicePlace",
              "note",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: User,
                attributes: ["id", "uuid", "name"],
              },
            ],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// single patient
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patients.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) return res.status(404).json({ msg: "data not found" });

    let response;
    if (req.roleId === 1) {
      response = await Patients.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "medicalRecordNumber",
          "birthDate",
          "gender",
          "profileImage",
          "phoneNumber",
          "email",
          "address",
          "disease",
          "note",
          "userId",
          "doctorId",
          "createdAt",
          "updatedAt",
        ],
        where: {
          id: patient.id,
        },
        // ada relasi
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "roleId"],
          },
          {
            model: Dicoms,
            attributes: ["id", "dicomFile", "createdAt", "updatedAt"],
          },
          {
            model: Doctors,
            attributes: [
              "id",
              "uuid",
              "userId",
              "strNumber",
              "birthDate",
              "address",
              "specialization",
              "practicePlace",
              "note",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: User,
                attributes: ["id", "uuid", "name"],
              },
            ],
          },
        ],
      });
    } else {
      response = await Patients.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "medicalRecordNumber",
          "birthDate",
          "gender",
          "profileImage",
          "phoneNumber",
          "email",
          "address",
          "disease",
          "note",
          "userId",
          "doctorId",
          "createdAt",
          "updatedAt",
        ],
        where: {
          [Op.and]: [{ id: patient.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "roleId"],
          },
          {
            model: Dicoms,
            attributes: ["id", "dicomFile", "createdAt", "updatedAt"],
          },
          {
            model: Doctors,
            attributes: [
              "id",
              "uuid",
              "userId",
              "strNumber",
              "birthDate",
              "address",
              "specialization",
              "practicePlace",
              "note",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: User,
                attributes: ["id", "uuid", "name"],
              },
            ],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create patient
export const createPatient = async (req, res) => {
  // if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const medicalRecordNumber = req.body.medicalRecordNumber;
  const name = req.body.name;
  // const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const address = req.body.address;
  const disease = req.body.disease;
  const doctorId = req.body.doctorId;
  const note = req.body.note;

  console.log(medicalRecordNumber);
  console.log(name);
  console.log(gender);
  console.log(phoneNumber);
  console.log(email);
  console.log(address);
  console.log(disease);
  console.log(doctorId);
  console.log(note);
  // const dicomFile = req.files.dicomFile;

  // const fileSizeDicom = dicomFile.data.length;
  // const extDicom = path.extname(dicomFile.name);
  // const fileNameDicom = dicomFile.md5 + extDicom;

  // const dicomFileUrl = `${req.protocol}://${req.get("host")}/images/${fileNameDicom}`;

  // const { name, email } = req.body;
  if (req.files === null) {
    // if (err) return res.status(500).json({ msg: err.message });
    try {
      await Patients.create({
        name: name,
        medicalRecordNumber: medicalRecordNumber,
        // birthDate: birthDate,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        disease: disease,
        doctorId: doctorId,
        note: note,
        userId: req.userId,
      });
      res.status(201).json({ msg: "patient created succesfull" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error 1" });
    }
  } else {
    const profileImage = req.files.profileImage;
    const fileSizeProfile = profileImage.data.length;
    const extProfile = path.extname(profileImage.name);
    const fileNameProfile = profileImage.md5 + extProfile;

    const profileImageUrl = `images/${fileNameProfile}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    // if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSizeProfile > 20000000)
      return res.status(422).json({ msg: "Image must be less than 20 MB" });

    profileImage.mv(`./public/images/${fileNameProfile}`, async (err) => {
      // if (err) return res.status(500).json({ msg: err.message });
      try {
        await Patients.create({
          name: name,
          medicalRecordNumber: medicalRecordNumber,
          gender: gender,
          profileImage: profileImageUrl,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
          disease: disease,
          doctorId: doctorId,
          note: note,
          userId: req.userId,
        });
        res.status(201).json({ msg: "patient created succesfull" });
      } catch (error) {
        res.status(500).json({ msg: "error 2" });
      }
    });
  }
};

// update patients
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patients.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) return res.status(404).json({ msg: "Data not found" });

    const medicalRecordNumber = req.body.medicalRecordNumber;
    const name = req.body.name;
    const birthDate = req.body.birthDate;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const address = req.body.address;
    const disease = req.body.disease;
    const doctorId = req.body.doctorId;
    const note = req.body.note;

    // const { name, email } = req.body;
    if (req.files !== null) {
      const profileImage = req.files.profileImage;

      const fileSizeProfile = profileImage.data.length;
      const extProfile = path.extname(profileImage.name);
      const fileNameProfile = profileImage.md5 + extProfile;

      const profileImageUrl = `images/${fileNameProfile}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (fileSizeProfile > 20000000)
        return res.status(422).json({ msg: "Image must be less than 20 MB" });
      profileImage.mv(`./public/images/${fileNameProfile}`, async (err) => {});
      if (req.roleId === 1) {
        await Patients.update(
          {
            name: name,
            medicalRecordNumber: medicalRecordNumber,
            birthDate: birthDate,
            gender: gender,
            profileImage: profileImageUrl,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            disease: disease,
            doctorId: doctorId,
            note: note,
            userId: req.userId,
          },
          {
            where: {
              id: patient.id,
            },
          },
        );
      } else {
        if (req.userId !== patient.userId)
          return res.status(403).json({ msg: "Access denied" });
        await Patients.update(
          {
            name: name,
            medicalRecordNumber: medicalRecordNumber,
            birthDate: birthDate,
            gender: gender,
            profileImage: profileImageUrl,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            disease: disease,
            doctorId: doctorId,
            note: note,
            userId: req.userId,
          },
          {
            where: {
              [Op.and]: [{ id: patient.id }, { userId: req.userId }],
            },
          },
        );
      }
    } else {
      if (req.roleId === 1) {
        await Patients.update(
          {
            name: name,
            medicalRecordNumber: medicalRecordNumber,
            birthDate: birthDate,
            gender: gender,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            disease: disease,
            doctorId: doctorId,
            note: note,
            userId: req.userId,
          },
          {
            where: {
              id: patient.id,
            },
          },
        );
      } else {
        if (req.userId !== patient.userId)
          return res.status(403).json({ msg: "Access denied" });
        await Patients.update(
          {
            name: name,
            medicalRecordNumber: medicalRecordNumber,
            birthDate: birthDate,
            gender: gender,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            disease: disease,
            doctorId: doctorId,
            note: note,
            userId: req.userId,
          },
          {
            where: {
              [Op.and]: [{ id: patient.id }, { userId: req.userId }],
            },
          },
        );
      }
    }
    res.status(200).json({ msg: "Patient updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: "erorr 3" });
  }
};

// delete
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patients.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) return res.status(404).json({ msg: "Data not found" });
    if (req.roleId === 1) {
      await Patients.destroy({
        where: {
          id: patient.id,
        },
      });
    } else {
      if (req.userId !== patient.userId)
        return res.status(403).json({ msg: "access forbidden" });
      await Patients.destroy({
        where: {
          [Op.and]: [{ id: patient.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Patients deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: "error 4" });
  }
};
