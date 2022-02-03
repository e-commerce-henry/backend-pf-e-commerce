const { Router } = require("express");
const route = Router();

const { getSaleBanner } = require("../controllers/SaleBanner/GetSaleBanner");
const { postSaleBanner } = require("../controllers/SaleBanner/PostSaleBanner");
const {
	deleteSaleBanner,
} = require("../controllers/SaleBanner/DeleteSaleBanner");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

route.get("/", getSaleBanner);
route.post("/", [requireAuth, isAdmin], postSaleBanner);
route.delete("/:id", [requireAuth, isAdmin], deleteSaleBanner);

module.exports = route;
