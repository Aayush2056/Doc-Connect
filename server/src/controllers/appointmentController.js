import Doctor from "../model/doctor.model.js";
import Appointment from "../model/appointment.model.js";

// Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({
        message: "Doctor, date and time are required",
      });
    }

    // Find doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // Convert date to day name
    const appointmentDate = new Date(date);

    const days = [ "Sunday","Monday", "Tuesday", "Wednesday",  "Thursday",  "Friday","Saturday", ];

    const dayName = days[appointmentDate.getDay()];

    // Check doctor's availability for that day
    const dayAvailability = doctor.availability.find(
      (item) => item.day === dayName
    );

    if (!dayAvailability || dayAvailability.slots.length === 0) {
      return res.status(400).json({
        message: `Doctor is not available on ${dayName}`,
      });
    }

    // Check selected time is inside available slot
    const isAvailable = dayAvailability.slots.some(
      (slot) => time >= slot.startTime && time < slot.endTime
    );

    if (!isAvailable) {
      return res.status(400).json({
        message: "Selected time is not available",
      });
    }

    // Check double booking
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: appointmentDate,
      time: time,
      status: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      date: appointmentDate,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
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
      .populate("doctor", "_id name")
    .sort({ date: 1 });

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

export { bookAppointment, getMyAppointments, getDoctorAppointments, updateAppointmentStatus,
};
