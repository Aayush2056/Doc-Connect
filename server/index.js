import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectdb from "./src/db/connectdb.js"
import authRoutes from "./src/routes/authRoutes.js"
import appointRoutes from "./src/routes/appointmentRoutes.js"
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth",authRoutes)
app.use("/api/appoint",appointRoutes)
app.listen(PORT,async()=>{
    await connectdb()
    console.log(`server is running on ${PORT}`);
}) 