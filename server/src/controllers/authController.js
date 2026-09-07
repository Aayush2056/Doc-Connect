import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Doctor from "../model/doctor.model.js";
import cloudinary from "../db/cloudinary.js";
const gentoken =(id)=>{
      return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      phone,
      fees,
      availability,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !fees
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Check image
    if (!req.file) {
      return res.status(400).json({
        message: "Doctor image is required",
      });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor already exists",
      });
    }

    // Parse availability
    const parsedAvailability = availability
      ? JSON.parse(availability)
      : [];

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      req.file.path
    );

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create doctor
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience: Number(experience) || 0,
      phone,
      fees: Number(fees),
      availability: parsedAvailability,
      image: result.secure_url,
    });

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor,
      token: gentoken(doctor),
    });

  } catch (error) {
    console.log("Doctor Register Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const registerUser = async(req,res)=>{
          const {name , email , password,role} = req.body
          try {
            const existUser = await User.findOne({email})
            if(existUser){
            return res.status(400).json({message : "user already exist"})    
            }
            const hashPassword = await bcrypt.hash(password,10);
           const newUser=  await User.create({name , email , password:hashPassword,role:"user"})
               return res.status(200).json({
                 _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                role : "user",
                token : gentoken(newUser._id),
               })
            }
           catch (error) {
            console.log(error);
            res.status(400).json({message : "something error", error: error}) 
          }
}
const loginUser =  async(req,res)=>{
    const {email,password} = req.body;
 
    try {
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : gentoken(user._id)
            })
        }
        else  res.status(400).json({message : "invaliddetails"})
    } catch (error) {
        res.status(400).json({message : "invalid email or password"})
    }
}
const loginDoctor = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await Doctor.findOne({email});
     
        if(user && (await bcrypt.compare(password,user.password))){
            res.status(200).json({
                   _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : gentoken(user._id)
            })
        }
         else  res.status(400).json({message : "invalid details"})
    } catch (error) {
          res.status(400).json({message : "invalid email or password"})
    }
}

const getUser = async(req,res)=>{
    try {
      const user = await User.find().select("-password");
      res.json({
       user
      })
    } catch (error) {
        res.status(500).json({message: "server-error"})
    }
}

export {registerUser ,loginUser,getUser,registerDoctor,loginDoctor}