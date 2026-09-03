import Razorpay from "razorpay";
import crypto from "crypto";
import Appointment from "../model/appointment.model.js";
import Doctor from "../model/doctor.model.js";

const createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const doctor = await Doctor.findById(appointment.doctor);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: doctor.fees * 100,
      currency: "INR",
      receipt: appointmentId.toString(),
    });

    res.status(200).json({
      message: "Payment order created",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const {   razorpay_order_id,  razorpay_payment_id,razorpay_signature, appointmentId,} = req.body;

    // 1. Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // 2. Create signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    // 3. Compare signatures
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    // 4. Payment verified
    appointment.paymentStatus = "paid";

    // Optional: save payment ID
    appointment.paymentId = razorpay_payment_id;

    await appointment.save();

    res.status(200).json({
      message: "Payment verified successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export {
  createPaymentOrder,
  verifyPayment,
};