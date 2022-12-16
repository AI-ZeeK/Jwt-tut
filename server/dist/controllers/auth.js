import User from "../models/Users.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        sendToken(user, 201, res);
    }
    catch (error) {
        next(error);
        console.log("new error");
    }
};
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an Email and Password", 400));
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        sendToken(existingUser, 201, res);
    }
    catch (error) {
        next(error);
    }
};
export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
		<h1>You have Requested a password reset</h1>
		<p>Please go to this link to reset your password</p>
		<a href=${resetUrl} clicktracking='off'>${resetUrl}</a>
		`;
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });
            return res.status(200).json({ success: true, data: "Email Sent" });
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email could not be synced", 500));
        }
    }
    catch (error) {
        next(error);
    }
};
export const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(201).json({ success: true, data: "Password Reset Success" });
    }
    catch (error) {
        next(error);
    }
};
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};
