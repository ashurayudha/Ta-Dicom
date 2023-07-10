import express from "express";
import { getPermission } from "../controllers/Permissions.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/permission", verifyUser, getPermission);
// router.get("/dicom/:id", verifyUser, getPatientById);
// router.post("/dicom", verifyUser, createPatient);
// router.patch("/dicom/:id", verifyUser, updatePatient);
// router.delete("/dicom/:id", verifyUser, deletePatient);

export default router;
