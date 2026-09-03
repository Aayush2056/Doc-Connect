import JWT from "jsonwebtoken"
import Doctor from "../model/doctor.model.js";
import User from "../model/user.model.js";
const protect = async (req,res,next) => {
      let token;
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                  try {
                    token = req.headers.authorization.split(' ')[1]
                    const decoded = await JWT.verify(token,process.env.JWT_SECRET)
                        req.user = await User.findById(decoded.id).select("-password");
                        next()
                     } catch (error) {
                    res.status(400).json({message:" invalid token"})
                  }
       }
    
}
const docProtect = async (req,res,next) => {
      let token;
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                  try {
                    token = req.headers.authorization.split(' ')[1]
                    const decoded = await JWT.verify(token,process.env.JWT_SECRET)
                        req.user = await Doctor.findById(decoded.id).select("-password");
                        next()
                     } catch (error) {
                    res.status(400).json({message:" invalid token"})
                  }
       }
    
}
export { protect, docProtect}