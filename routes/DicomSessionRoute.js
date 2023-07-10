import express from "express";
import { createDicomSession } from "../controllers/DicomSessions.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.post("/dicom-session", verifyUser, createDicomSession);
// router.get("/dicom/:id", verifyUser, getPatientById);
// router.post("/dicom", verifyUser, createPatient);
// router.patch("/dicom/:id", verifyUser, updatePatient);
// router.delete("/dicom/:id", verifyUser, deletePatient);

export default router;
