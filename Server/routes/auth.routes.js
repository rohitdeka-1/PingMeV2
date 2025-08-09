import express from 'express';
import {forgotPassword, login, logout, resetPassword, signup} from '../controllers/auth.controller.js'; 
import { loginValidation, signupValidation } from '../middlewares/authValidation.middleware.js';

 
const authRoute = express.Router();

authRoute.post('/login',loginValidation,login);
authRoute.post('/signup',signupValidation, signup);
authRoute.post('/forgot-password',forgotPassword);
authRoute.post('/reset-password/:token',resetPassword);
authRoute.get('/logout',logout)

export default authRoute;

