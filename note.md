user

uuid
name
email
password
role

StrNumber
name
birthDate
gender
profileImage
phoneNumber
email
address
specialization
practicePlace
note

<!-- full user -->

uuid
StrNumber
name
birthDate
gender
profileImage
phoneNumber
email
address
specialization
practicePlace
note
password
role

import Patients from "../models/PatientModel.js";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
export const getPatients = async (req, res) => {
try {
let response;
if (req.role === 1) {
response = await Patients.findAll({
attributes: ["uuid", "name", "birthDate", "gender", "profileImage", "phoneNumber", "email", "address", "disease", "note", "dicomFile"],
// ada relasi
include: [
{
model: User,
attributes: ["name", "email", "role"],
},
],
});
} else {
response = await Patients.findAll({
attributes: ["uuid", "name", "birthDate", "gender", "profileImage", "phoneNumber", "email", "address", "disease", "note", "dicomFile"],
where: { userId: req.userId },
include: [
{
model: User,
attributes: ["name", "email", "role"],
},
],
});
}

    res.status(200).json(response);

} catch (error) {
res.status(500).json({ msg: error.message });
}
};

export const getPatientById = async (req, res) => {
try {
const patient = await Patients.findOne({
where: {
uuid: req.params.id,
},
});
if (!patient) return res.status(404).json({ msg: "data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Patients.findOne({
        attributes: ["uuid", "name", "birthDate", "gender", "profileImage", "phoneNumber", "email", "address", "disease", "note", "dicomFile"],
        where: {
          id: patient.id,
        },
        // ada relasi
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Patients.findOne({
        attributes: ["uuid", "name", "birthDate", "gender", "profileImage", "phoneNumber", "email", "address", "disease", "note", "dicomFile"],
        where: {
          [Op.and]: [{ id: patient.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
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
const birthDate = req.body.birthDate;
const gender = req.body.gender;
const profileImage = req.files.profileImage;
const phoneNumber = req.body.phoneNumber;
const email = req.body.email;
const address = req.body.address;
const disease = req.body.disease;
const note = req.body.note;
const dicomFile = req.files.dicomFile;

const fileSizeDicom = dicomFile.data.length;
const extDicom = path.extname(dicomFile.name);
const fileNameDicom = dicomFile.md5 + extDicom;

const dicomFileUrl = `${req.protocol}://${req.get("host")}/images/${fileNameDicom}`;

const fileSizeProfile = profileImage.data.length;
const extProfile = path.extname(profileImage.name);
const fileNameProfile = profileImage.md5 + extProfile;

const profileImageUrl = `${req.protocol}://${req.get("host")}/images/${fileNameProfile}`;
const allowedType = [".png", ".jpg", ".jpeg", ".dcm"];

// if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
if (fileSizeDicom > 20000000 || fileSizeProfile > 20000000) return res.status(422).json({ msg: "Image must be less than 20 MB" });

// const { name, email } = req.body;
dicomFile.mv(`./public/images/${fileNameDicom}`, async (err) => {
profileImage.mv(`./public/images/${fileNameProfile}`, async (err) => {
if (err) return res.status(500).json({ msg: err.message });
try {
await Patients.create({
name: name,
medicalRecordNumber: medicalRecordNumber,
birthDate: birthDate,
gender: gender,
profileImage: profileImageUrl,
phoneNumber: phoneNumber,
email: email,
address: address,
disease: disease,
note: note,
dicomFile: dicomFileUrl,
userId: req.userId,
});
res.status(201).json({ msg: "patient created succesfull" });
} catch (error) {
res.status(500).json({ msg: error.message });
}
});
});
};

export const updatePatient = async (req, res) => {
try {
const patient = await Patients.findOne({
where: {
uuid: req.params.id,
},
});
if (!patient) return res.status(404).json({ msg: "Data tidak ditemukan" });
const { name, email } = req.body;
if (req.role === "admin") {
await Patients.update(
{ name, email },
{
where: {
id: patient.id,
},
}
);
} else {
if (req.userId !== patient.userId) return res.status(403).json({ msg: "Akses terlarang" });
await Patients.update(
{ name, email },
{
where: {
[Op.and]: [{ id: patient.id }, { userId: req.userId }],
},
}
);
}
res.status(200).json({ msg: "Patient updated successfuly" });
} catch (error) {
res.status(500).json({ msg: error.message });
}
};

export const deletePatient = async (req, res) => {
try {
const patient = await Patients.findOne({
where: {
uuid: req.params.id,
},
});
if (!patient) return res.status(404).json({ msg: "Data tidak ditemukan" });
if (req.role === "admin") {
await Patients.destroy({
where: {
id: patient.id,
},
});
} else {
if (req.userId !== patient.userId) return res.status(403).json({ msg: "Akses terlarang" });
await Patients.destroy({
where: {
[Op.and]: [{ id: patient.id }, { userId: req.userId }],
},
});
}
res.status(200).json({ msg: "Patients deleted successfuly" });
} catch (error) {
res.status(500).json({ msg: error.message });
}
};
