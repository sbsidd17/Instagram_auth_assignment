import { config } from "dotenv"
import app from "./app.js"
import dbConnect from "./config/dbConnect.js"
config()

const PORT = process.env.PORT || 3001



app.listen(PORT, async ()=>{
    await dbConnect();
    console.log(`Server is running on ${PORT}`)
}); 