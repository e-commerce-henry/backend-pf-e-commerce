const router = require("express").Router();
const welcomeEmail = require("../controllers/Nodemailer/post-Welcome");

router.post("/welcome", welcomeEmail);

module.exports = router;
