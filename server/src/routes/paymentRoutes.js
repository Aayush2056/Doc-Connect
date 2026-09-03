import express from "express";
import { protect } from "../middlewares/protect.js";

import {createPaymentOrder, verifyPayment,} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/createOrder", protect, createPaymentOrder);

router.post("/verifyOrder", protect, verifyPayment);

export default router;