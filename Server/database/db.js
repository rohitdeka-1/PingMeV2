import mongoose from "mongoose";
import dotenv from 'dotenv';
import envConfig from "../config/env.config.js"

dotenv.config();
const mongo_uri = envConfig.MONGO_URI;

if (!mongo_uri) {
    console.error("❌ MongoDB URI is not defined in environment variables");
    console.error("Please set MONGO_URI or MONGODB_URI in your .env file");
    process.exit(1);
}

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("✅ Database connected successfully");
})
.catch((err)=>{
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
})

