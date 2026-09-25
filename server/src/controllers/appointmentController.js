import Doctor from "../model/doctor.model.js";
import Appointment from "../model/appointment.model.js";

export const createAppointment = async ({
  userId,
  doctorId,
  date,
  time,
}) => {

  if (!doctorId || !date || !time) {
    throw new Error("Doctor, date and time are required");
  }

  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const appointmentDate = new Date(date);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = days[appointmentDate.getDay()];

  const dayAvailability = doctor.availability.find(
    (item) => item.day === dayName
  );

  if (!dayAvailability || dayAvailability.slots.length === 0) {
    throw new Error(`Doctor is not available on ${dayName}`);
  }

  const isAvailable = dayAvailability.slots.some(
    (slot) =>
      time >= slot.startTime &&
      time < slot.endTime
  );

  if (!isAvailable) {
    throw new Error("Selected time is not available");
  }

  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    date: appointmentDate,
    time: time,
    status: { $ne: "cancelled" },
  });

  if (existingAppointment) {
    throw new Error("This time slot is already booked");
  }

  const appointment = await Appointment.create({
    user: userId,
    doctor: doctorId,
    date: appointmentDate,
    time,
  });

  return appointment;
};

// Book Appointment
 const bookAppointment = async (req, res) => {
  try {

    const { doctorId, date, time } = req.body;

    const appointment = await createAppointment({
      userId: req.user._id,
      doctorId,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }
};


// Get patient's appointments
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    })
      .populate("doctor", "_id name  specialization image fees")
    .sort({ date: 1 });
       console.log(
      "APPOINTMENTS COUNT:",
      appointments.length
    );

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get doctor's appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id,
    })
      .populate("user", "-password")
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }
    // Check whether logged-in doctor owns this appointment
    if (appointment.doctor.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Only the assigned doctor can update appointment status",
      });
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Check appointment belongs to logged-in user
    if (
      appointment.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can cancel only your own appointment",
      });
    }

    // Paid appointment cannot be cancelled
    if (appointment.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Paid appointment cannot be cancelled",
      });
    }

    // Delete appointment from database
    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log("CANCEL APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export { bookAppointment, getMyAppointments, getDoctorAppointments, updateAppointmentStatus,cancelAppointment
};
