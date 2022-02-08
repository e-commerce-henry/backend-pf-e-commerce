const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: "casper.hyatt90@ethereal.email", // generated ethereal user
		pass: "w8HEm88WqVm9WSK8jk", // generated ethereal password
	},
});

module.exports = { transporter };
