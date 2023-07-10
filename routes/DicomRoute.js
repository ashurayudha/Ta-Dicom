import express from "express";
import { createDicom, deleteDicom, getDicom } from "../controllers/Dicoms.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.post("/dicom", verifyUser, createDicom);
router.get("/dicom/:patientId", verifyUser, getDicom);
// router.get("/dicom/:id", verifyUser, getPatientById);
// router.post("/dicom", verifyUser, createPatient);
// router.patch("/dicom/:id", verifyUser, updatePatient);
router.delete("/dicom/:id", verifyUser, deleteDicom);

export default router;
