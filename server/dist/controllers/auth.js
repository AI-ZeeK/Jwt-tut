import User from "../models/Users.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcryptjs";
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
export const forgotPassword = (req, res, next) => {
    res.send("forgot password Route");
};
export const resetPassword = (req, res, next) => {
    res.send("reset password Route");
};
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};
