import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express"
import userRouter from "./routes/userRoutes.js";
import cors from "cors"
import { config } from "dotenv"
config()

const app = express()

app.use(cors({
    origin:process.env.CLIENT_URL, 
    credentials:true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/", userRouter)


export default app;