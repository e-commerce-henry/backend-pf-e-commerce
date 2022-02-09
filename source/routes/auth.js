const router = require("express").Router();
const signUp = require("../controllers/Auth/signUp");
const signIn = require("../controllers/Auth/signIn");
const logOut = require("../controllers/Auth/logOut");
const googleLogin = require("../controllers/Auth/googleAuth");
const signInAdmin = require("../controllers/Auth/signInAdmin");
const forgotPwd = require("../controllers/Auth/forgotPassword");
const resetPwdVerify = require("../controllers/Auth/resetPasswordVerify");
const resetPwdForm = require("../controllers/Auth/resetPasswordForm");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/googleAuth", googleLogin);
router.post("/signInAdmin", signInAdmin);
router.post("/forgot-password", forgotPwd);
router.get("/reset-password-verify/:id/:token", resetPwdVerify);
router.post("/reset-password-confirm/:id/:token", resetPwdForm);
// router.get("/logOut", logOut);

module.exports = router;
