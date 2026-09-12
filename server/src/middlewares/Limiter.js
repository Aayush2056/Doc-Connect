import express from "express"
import rateLimit from "express-rate-limit"
const app = express();


app.set('trust proxy', 1);

// Middleware to parse JSON
app.use(express.json());

// 2. Rate Limiters Initialization
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: { 
        success: false, 
        message: "Too many login attempts. Please try again after 15 minutes." 
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 signup requests per hour
    message: { 
        success: false, 
        message: "Too many accounts created from this device. Please try again later." 
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export {loginLimiter , signupLimiter}
