import express from "express";
import { createDoctor, getDoctorById, deleteDoctor, updateDoctor, getAllDoctor } from "../controllers/Doctors.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.post("/doctor", verifyUser, createDoctor);
router.get("/doctor/:id", verifyUser, getDoctorById);
router.get("/doctor", verifyUser, getAllDoctor);
router.patch("/doctor/:id", verifyUser, updateDoctor);
router.delete("/doctor/:id", verifyUser, deleteDoctor);

export default router;
