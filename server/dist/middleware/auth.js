import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import ErrorResponse from "../utils/ErrorResponse.js";
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("Not authorised tonaccess this route", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;
        const user = await User.findById(id);
        if (!user) {
            return next(new ErrorResponse("No user with this Id found", 404));
        }
        next();
    }
    catch (error) {
        return next(new ErrorResponse("Not Authorised to access this route", 401));
    }
};
