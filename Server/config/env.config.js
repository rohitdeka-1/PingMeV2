import dotenv from "dotenv";
dotenv.config();

const envConfig = {
    FRONTEND: process.env.FRONT_END,
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN, 
    GOOGLE_APP_GMAIL: process.env.GOOGLE_APP_GMAIL,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD
}

export default envConfig;