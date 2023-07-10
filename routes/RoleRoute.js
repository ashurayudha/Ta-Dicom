import express from "express";
import { createRole, deleteRole, getRole, getRoleById, updateRole } from "../controllers/Roles.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/role", verifyUser, getRole);
router.get("/role/:id", verifyUser, getRoleById);
router.post("/role", verifyUser, adminOnly, createRole);
router.patch("/role/:id", verifyUser, adminOnly, updateRole);
router.delete("/role/:id", verifyUser, adminOnly, deleteRole);

export default router;
