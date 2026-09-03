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

export { getAllUsers, getAllDoctors ,getAllAppointments};