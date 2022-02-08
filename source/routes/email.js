const router = require("express").Router();
const contactEmail = require("../controllers/Nodemailer/post-Contact");
const welcomeEmail = require("../controllers/Nodemailer/post-Welcome");

router.post("/welcome", welcomeEmail);
router.post("/contact", contactEmail);

module.exports = router;
