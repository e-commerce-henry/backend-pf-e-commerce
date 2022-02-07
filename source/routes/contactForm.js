const router = require("express").Router();
const deleteContactForm = require("../controllers/ContactForm/deleteContactForm");
const getContactForms = require("../controllers/ContactForm/getAllContactForms");
const createContactForm = require("../controllers/ContactForm/postContactForm");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", createContactForm);
router.delete("/:contactId", [requireAuth, isAdmin], deleteContactForm);
router.get("/", [requireAuth, isAdmin], getContactForms);

module.exports = router;
