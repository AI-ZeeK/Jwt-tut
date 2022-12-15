import User from "../models/Users.js";
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: error.message,
        });
    }
};
export const login = (req, res, next) => {
    res.send("login Route");
};
export const forgotPassword = (req, res, next) => {
    res.send("forgot password Route");
};
export const resetPassword = (req, res, next) => {
    res.send("reset password Route");
};
