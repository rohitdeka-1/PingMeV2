import { Router } from "express";
import authRoute from "./auth.routes.js";
import { transporter } from "../services/mailer.services.js";
import path from "path";
const router = Router();
import messageRoute from "./message.routes.js";
import hbs from "nodemailer-express-handlebars"
import userRoute from "./user.routes.js";
// import friendRoute from "./friend.routes.js"; // COMMENTED OUT - Friend functionality disabled
// import friendRoute from "./friend.routes.js";

// import roomRoute from "./Room.js";

//handlebars
// const hbsOptions = {
//     viewEngine: {
//         defaultLayout: false
//     },
//     viewPath: path.resolve("Email")
// }

// transporter.use('compile',hbs(hbsOptions))




router.use("/auth",authRoute)
router.use("/message",messageRoute);
router.use("/users",userRoute)
// router.use("/friend",friendRoute) // COMMENTED OUT - Friend functionality disabled


export default router



