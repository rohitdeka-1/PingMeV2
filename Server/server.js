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
import userModel from './models/user.model.js';

dotenv.config();

const app = express();
const PORT = envConfig.PORT;
const server = createServer(app);

export const io = connectToSocket(server, {                                      
    cors: {
        methods: ["POST", "GET"],
        origin: ["http://localhost:5173"]

    }
});

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use(express.json({ limit: '40kb', extended: true }));

app.use("/api/v1", router);
 

app.get('/', (req, res) => {
    res.send("Hi")
})

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})