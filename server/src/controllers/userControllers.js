import Doctor from "../model/doctor.model.js";
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);

  } catch (error) {
    console.log("GET DOCTOR BY ID ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch doctor details",
    });
  }
};
export default getDoctorById