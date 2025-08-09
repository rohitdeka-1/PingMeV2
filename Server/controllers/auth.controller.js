import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";
import { sendMail } from "../services/mailer.services.js";
import getIpAddress from "../services/getIP.js";
import crypto from "node:crypto";


const findIdentity = async (identity) => {
    return await UserModel.findOne({
        $or: [
            { email: identity },
            { username: identity }
        ]
    });
};

export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        // Add validation for fullname
        if (!fullname || fullname.trim() === '') {
            return res.status(400).json({
                message: "Full name is required",
                success: false
            });
        }

        const existing = await UserModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if (existing) {
            return res.status(409).json({ message: "user already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const seed = username || email || Date.now().toString();

        const profilePhoto = `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(seed)}`;
        const newUser = new UserModel({
            fullname,
            username,
            email,
            password: hashedPassword,
            profilePhoto
        });
        await newUser.save();

        sendMail(newUser.email, "Welcome to Ping Me", "Welcome", {
            username: newUser.username,
        });

        return res.status(201).json({
            message: "Signup Success",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { identity, password } = req.body;
        const user = await findIdentity(identity);

        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect Credentials",
                success: false,
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            envConfig.ACCESS_TOKEN,
            { expiresIn: "1d" }
        );

        const ipAddress = getIpAddress();

        sendMail(user.email, "Login Detected PingMe", "Login", {
            username: user.username,
            ipAddress,
            loginTime: new Date().toLocaleString(),
            deviceInfo: req.headers["user-agent"] || "Unknown device",
        });

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
            })
            .send({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                profilePhoto: user.profilePhoto,
                message: "Login Success",
                success: true
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const forgotPassword = async (req, res) => {
    const { identity } = req.body;
    try {
        const user = await findIdentity(identity);

        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists",
                success: false,
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpiry = Date.now() + 12 * 60 * 1000;
        await UserModel.updateOne({ _id: user._id }, {
            $set: {
                resetPasswordToken: hashedToken,
                resetPasswordExpiry: user.resetPasswordExpiry
            }
        });

        const resetLink = `${envConfig.FRONTEND}/reset-password/${resetToken}`;

        sendMail(
            user.email,
            "Password Reset Request - PingMe",
            "PasswordReset",
            {
                username: user.username,
                requestTime: new Date().toLocaleString(),
                ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown IP",
                deviceInfo: req.headers["user-agent"] || "Unknown device",
                resetLink,
                year: new Date().getFullYear()
            }
        );

        return res.status(200).json({
            message: "Password reset successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;
    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(404).json({
                message: "Reset link expired or not sent",
                success: false,
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(401).json({
                message: "Passwords don't match",
                success: false,
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        sendMail(
            user.email,
            "Password Changed - PingMe",
            "PasswordChanged",
            {
                username: user.username,
                deviceInfo: req.headers["user-agent"] || "Unknown device",
                ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown IP",
                changeTime: new Date().toLocaleString(),
                year: new Date().getFullYear()
            }
        );

        return res.status(200).json({
            message: "Password reset successful",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}