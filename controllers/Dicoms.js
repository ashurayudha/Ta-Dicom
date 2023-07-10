import Dicoms from "../models/DicomModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

// get dicom
export const getDicom = async (req, res) => {
  try {
    const response = await Dicoms.findAll({
      attributes: ["id", "uuid", "dicomFile", "patientId", "createdAt", "updatedAt"],
      where: {
        patientId: req.params.patientId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create dicom
export const createDicom = async (req, res) => {
  const dicomFile = req.files.dicomFile;
  const patienId = req.body.patienId;

  // const fileSizeDicom = dicomFile.data.length;
  const extDicom = path.extname(dicomFile.name);
  const fileNameDicom = dicomFile.md5 + extDicom;

  const dicomFileUrl = `/images/${fileNameDicom}`;

  dicomFile.mv(`./public/images/${fileNameDicom}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Dicoms.create({
        dicomFile: dicomFileUrl,
        patientId: patienId,
      });
      res.status(201).json({ msg: "dicom created succesfull" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// get dicom by id
// export const getDicomById = async (req, res) => {
//   try {
//     const response = await Dicoms.findOne({
//       attributes: [],
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// update dicom by id / gak guna
// export const updateDicomById = async (req, res) => {
//   const dicomFile = req.files.dicomFile;
//   const patienId = req.body.patienId;

//   const fileSizeDicom = dicomFile.data.length;
//   const extDicom = path.extname(dicomFile.name);
//   const fileNameDicom = dicomFile.md5 + extDicom;

//   const dicomFileUrl = `/images/${fileNameDicom}`;

//   dicomFile.mv(`./public/images/${fileNameDicom}`, async (err) => {
//     await Dicoms.update({
//       dicomFile: dicomFileUrl,
//       patientId: patienId,
//     });
//   });
// };

// delete dicom
export const deleteDicom = async (req, res) => {
  const dicomId = await Dicoms.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!dicomId) return res.status(404).json({ msg: "dicom file not found" });

  try {
    await Dicoms.destroy({
      where: {
        id: dicomId.id,
      },
    });
    res.status(200).json({ msg: "delete success" });
  } catch (error) {
    res.status(500).json({ msg: res.message });
  }
};
