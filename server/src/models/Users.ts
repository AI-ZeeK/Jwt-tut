import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

const User = mongoose.model("User", Userschema);

export default User;
