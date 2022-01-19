const router = require("express").Router();

const postUserRouter = require("./postUser");

router.use("/createUser", postUserRouter);

module.exports = router;
