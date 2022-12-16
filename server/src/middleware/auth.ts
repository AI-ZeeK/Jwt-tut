import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import ErrorResponse from "../utils/ErrorResponse.js";

interface ReqRes {
	(req: Request, res: Response, next: NextFunction): any;
}
const protect: ReqRes = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) {
		return next(new ErrorResponse("Not authorised tonaccess this route", 401));
	}

	try {
		const decoded = jwt.verify(token, <any>process.env.JWT_SECRET);
		const { id }: any = decoded;
		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse("No user with this Id found", 404));
		}

		next();
	} catch (error) {
		return next(new ErrorResponse("Not Authorised to access this route", 401));
	}
};
