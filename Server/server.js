import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import './database/db.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from "node:http";
import { connectToSocket } from "./socket/socket.js"
import router from "./routes/index.js"
import envConfig from './config/env.config.js';
 

dotenv.config();

const app = express();
const PORT = process.env.PORT || envConfig.PORT || 5000;
const server = createServer(app);

export const io = connectToSocket(server, {                                      
    cors: {
        methods: ["POST", "GET"],
        origin: [
            envConfig.FRONTEND || "http://localhost:5173",
            "https://pingme-sigma.vercel.app",
            "https://pingme-sigma.vercel.app/"
        ]
    }
});

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [
        envConfig.FRONTEND || "http://localhost:5173",
        "https://pingme-sigma.vercel.app",
        "https://pingme-sigma.vercel.app/"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use(express.json({ limit: '40kb', extended: true }));

app.use("/api/v1", router);
 

app.get('/', (req, res) => {
    res.json({ 
        message: "PingMe API is running successfully!",
        version: "2.0.0",
        status: "active"
    });
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})