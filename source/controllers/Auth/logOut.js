const logOut = (req, res) => {
	console.log("entra");
	res.cookie("jwt", "", { maxAge: 1 }); //because it's not possible to eliminate the cookie from serverside, a blank value cookie is sent to replace
	res.redirect("/");
};

module.exports = logOut;
