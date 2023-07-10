import express from "express";
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from "../controllers/Patients.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/patient", verifyUser, getPatients);
router.get("/patient/:id", verifyUser, getPatientById);
router.post("/patient", verifyUser, createPatient);
router.patch("/patient/:id", verifyUser, updatePatient);
router.delete("/patient/:id", verifyUser, deletePatient);

export default router;
