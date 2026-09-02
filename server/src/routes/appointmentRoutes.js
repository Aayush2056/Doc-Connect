import express from "express";
import protect from "../middlewares/protect.js"
import { bookAppointment,getMyAppointments,getDoctorAppointments,updateAppointmentStatus,} from "../controllers/appointmentController.js";
const router = express.Router();

// user
router.post("/book",protect, bookAppointment);

router.get("/my",protect, getMyAppointments);


// Doctor
router.get("/doctor",protect, getDoctorAppointments);


// Update status
router.put("/:id/status",protect, updateAppointmentStatus);

export default router;

