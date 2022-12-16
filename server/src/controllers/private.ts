import { NextFunction, Request, Response } from "express";

interface ReqRes {
	(req: Request, res: Response, next: NextFunction): any;
}

export const getPrivateData: ReqRes = async (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "You got access to the private data in this route",
	});
};
