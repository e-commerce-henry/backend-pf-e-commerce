const router = require("express").Router();
const contactEmail = require("../controllers/Nodemailer/post-Contact");
const answerEmail = require("../controllers/Nodemailer/post-ContactReply");
const welcomeEmail = require("../controllers/Nodemailer/post-Welcome");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

router.post("/welcome", welcomeEmail);
router.post("/contact", contactEmail);
router.post("/answer/:id", [requireAuth, isAdmin], answerEmail);

module.exports = router;
