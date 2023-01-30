import nodemailer from "nodemailer";

export const sendEmail = (options: any) => {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		secure: false,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: options.to || "isaaciyaye174@gmail.com",
		subject: options.subject,
		html: options.text,
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
};
