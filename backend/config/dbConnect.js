import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully");

    } catch (error) {
        throw error.message
    }
}

export default dbConnect;