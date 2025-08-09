import express from "express";
import { verifyJWT } from "../middlewares/verifyToken.middleware.js";
import { getMessage, sendMessage } from "../controllers/messages.controller.js";


const messageRoute = express.Router();

messageRoute.post("/send/:id",verifyJWT,sendMessage);
messageRoute.get("/:id",verifyJWT,getMessage)


export default messageRoute;