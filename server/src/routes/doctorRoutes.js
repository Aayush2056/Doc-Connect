import express from "express"
import getDoctorById from "../controllers/userControllers.js";
 const router = express.Router();

router.get("/:id", getDoctorById);
export default router