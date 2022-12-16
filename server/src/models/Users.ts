import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

const Userschema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "please provide a username"],
	},
	email: {
		type: String,
		required: [true, "please provide a email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

Userschema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

Userschema.methods.matchPasswords = async function (password: any) {
	return await bcrypt.compare(password, this.password);
};

// Check why that  any declaration worked
Userschema.methods.getSignedToken = function () {
	return Jwt.sign({ id: this._id }, <any>process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

Userschema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

	return resetToken;
};
const User = mongoose.model("User", Userschema);

export default User;
