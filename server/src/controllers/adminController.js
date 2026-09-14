import User from "../model/user.model.js";
import Doctor from "../model/doctor.model.js";
import Appointment from "../model/appointment.model.js";
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllAppointments = async (req,res) => {
  try {
    const appointment = await Appointment.find().populate("doctor" ,"_id name ").populate("user" , "_id name")
    return res.status(200).json({appointment:appointment})
  } catch (error) {
    return res.status(500).json({error:error})
  }
}
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Admin ko delete hone se rokna
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log("DELETE USER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Doctor deleted successfully",
    });

  } catch (error) {
    console.log("DELETE DOCTOR ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export { getAllUsers, getAllDoctors ,getAllAppointments,deleteUser,deleteDoctor};