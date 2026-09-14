import express from "express"
import { getAllUsers, getAllDoctors, getAllAppointments,deleteUser,deleteDoctor } from "../controllers/adminController.js"
import admin from "../middlewares/admin.js";
import { protect } from "../middlewares/protect.js";
const router = express.Router()

router.get("/users",protect, admin ,getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);

router.get("/doctors",protect, getAllDoctors);
router.delete("/doctors/:id", protect, admin, deleteDoctor);

router.get("/appoints",protect,admin,getAllAppointments)

export default router;