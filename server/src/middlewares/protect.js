import JWT from "jsonwebtoken"
import Doctor from "../model/doctor.model.js";
import User from "../model/user.model.js";
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();

  } catch (error) {
    console.log("PROTECT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
const docProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = JWT.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      const doctor = await Doctor.findById(decoded.id).select(
        "-password"
      );

      console.log("DOCTOR:", doctor);

      if (!doctor) {
        return res.status(401).json({
          message: "Doctor not found",
        });
      }

      req.user = doctor;

      next();
    } catch (error) {
      console.log("DOC PROTECT ERROR:", error);

      return res.status(400).json({
        message: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};
export { protect, docProtect}