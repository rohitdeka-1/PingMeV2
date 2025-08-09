import express from "express";
import { getOtherUsers, searchUsers, getUserById } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyToken.middleware.js";

// const router = express.Router();
const userRoutes = express.Router();

// router.route("/").get(verifyJWT, getOtherUsers);
// router.route("/search").get(verifyJWT, searchUsers);

userRoutes.get("/",verifyJWT,getOtherUsers)
userRoutes.get("/search",verifyJWT,searchUsers)
userRoutes.get("/:userId",verifyJWT,getUserById)

export default userRoutes;
