import express from "express";
import {protect , docProtect} from "../middlewares/protect.js"
import { bookAppointment,getMyAppointments,getDoctorAppointments,updateAppointmentStatus,} from "../controllers/appointmentController.js";
const router = express.Router();

// user
router.post("/book",protect, bookAppointment);

router.get("/my",protect, getMyAppointments);


// Doctor
router.get("/doctor",docProtect, getDoctorAppointments);


// Update status
router.put("/:id/status",docProtect, updateAppointmentStatus);

export default router;

