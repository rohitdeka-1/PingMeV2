import mongoose from "mongoose";
import dotenv from 'dotenv';
import envConfig from "../config/env.config.js"

dotenv.config();
const mongo_uri = envConfig.MONGO_URI;

mongoose.connect(mongo_uri)
.then(()=>{
    console.log("DB Connnected ")
})
.catch((err)=>{
    console.log("DB Con failed ", err);
})

