const router = require("express").Router();
const signUp = require("../controllers/Auth/signUp");
const signIn = require("../controllers/Auth/signIn");
const logOut = require("../controllers/Auth/logOut");
const googleLogin = require("../controllers/Auth/googleAuth");
const signInAdmin = require("../controllers/Auth/signInAdmin");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/googleAuth", googleLogin);
router.post("/signInAdmin", signInAdmin);
// router.get("/logOut", logOut);

module.exports = router;
