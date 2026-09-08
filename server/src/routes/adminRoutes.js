import express from "express"
import { getAllUsers, getAllDoctors, getAllAppointments } from "../controllers/adminController.js"
import admin from "../middlewares/admin.js";
import { protect } from "../middlewares/protect.js";
const router = express.Router()

router.get("/users",protect, admin ,getAllUsers);
router.get("/doctors",protect, getAllDoctors);
router.get("/appoints",protect,admin,getAllAppointments)

export default router;