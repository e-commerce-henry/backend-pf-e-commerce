const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const flash = require("express-flash");
const routes = require("./routes/index.js");
const initializePassport = require("../passport-config");

require("./db");

const app = express();

initializePassport(passport);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // Front-End all url "*"
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//Authentication method missing  - possible passport.js implementation
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//middleware to apply all the possible routes in server
app.use("/", routes);

const ensureAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true, //called from FrontEnd as messages.error
	})
);
app.get("/", ensureAuth, (req, res) => {
	res.send("gola");
});
app.get("/login", (req, res) => {
	res.send("hola");
});
app.get("/logout", (req, res) => {
	req.logout(); //clear session
	res.redirect("/");
});

// Error catching endware.
app.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = app;
