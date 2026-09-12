import express from "express"
const router = express.Router();
import { registerUser ,loginUser,getUser,registerDoctor,loginDoctor } from "../controllers/authController.js"
import {protect , docProtect} from "../middlewares/protect.js"
import admin from "../middlewares/admin.js";
import multer from "multer"
import { loginLimiter ,signupLimiter } from "../middlewares/Limiter.js";
const upload = multer({
  dest: "uploads/"
});

router.post("/register",signupLimiter,registerUser)
router.post("/login",loginLimiter,loginUser)

router.post("/doc/register",upload.single('image'), signupLimiter,registerDoctor)
router.post("/doc/login",loginLimiter,loginDoctor)

export default router
