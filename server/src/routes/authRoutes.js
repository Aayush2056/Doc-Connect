import express from "express"
const router = express.Router();
import { registerUser ,loginUser,getUser,registerDoctor,loginDoctor } from "../controllers/authController.js"
import {protect , docProtect} from "../middlewares/protect.js"
import admin from "../middlewares/admin.js";
import multer from "multer"
const upload = multer({
  dest: "uploads/"
});

router.post("/register",registerUser)
router.post("/login",loginUser)

router.post("/doc/register",upload.single('image'), registerDoctor)
router.post("/doc/login",loginDoctor)

export default router
