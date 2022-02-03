const router = require("express").Router();
const signUp = require("../controllers/Auth/signUp");
const signIn = require("../controllers/Auth/signIn");
const logOut = require("../controllers/Auth/logOut");
const googleLogin = require("../controllers/Auth/googleAuth");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/googleAuth", googleLogin);
// router.get("/logOut", logOut);

module.exports = router;
