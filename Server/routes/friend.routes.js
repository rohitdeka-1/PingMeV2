// FRIEND ROUTES - COMMENTED OUT
/*
import express from "express";
import { verifyJWT } from "../middlewares/verifyToken.middleware.js";
import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    getPendingRequests, 
    getFriends 
} from "../controllers/friend.controller.js";

const friendRoute = express.Router();

friendRoute.use(verifyJWT);


friendRoute.post("/send-request", sendFriendRequest);
friendRoute.post("/accept-request", acceptFriendRequest);
friendRoute.get("/pending-requests", getPendingRequests);
friendRoute.get("/", getFriends);

export default friendRoute;
*/

// Empty router since friend functionality is disabled
import express from "express";
const friendRoute = express.Router();
export default friendRoute;