import { NextFunction, Request, Response } from "express";

import User from "../models/Users.js";

interface ReqRes {
	(req: Request, res: Response, next: NextFunction): any;
}
export const register: ReqRes = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		res.status(201).json({ success: true, user });
	} catch (error: any) {
		res.status(401).json({
			success: false,
			error: error.message,
		});
	}
};

export const login: ReqRes = (req, res, next) => {
	res.send("login Route");
};

export const forgotPassword = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.send("forgot password Route");
};

export const resetPassword = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.send("reset password Route");
};
