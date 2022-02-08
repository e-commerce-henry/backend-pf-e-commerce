const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: "atrcomputacionstore@gmail.com", // generated ethereal user
		pass: "admin1234*", // generated ethereal password
	},
	tls: {
		rejectUnauthorized: false,
		ciphers: "SSLv3",
	},
});

module.exports = { transporter };
