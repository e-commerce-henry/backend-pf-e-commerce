const router = require("express").Router();
const signUp = require("../controllers/Auth/signUp");
const signIn = require("../controllers/Auth/signIn");
const logOut = require("../controllers/Auth/logOut");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/logOut", logOut);

module.exports = router;
