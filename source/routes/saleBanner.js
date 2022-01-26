const { Router } = require("express");
const route = Router();

const { getSaleBanner } = require("../controllers/SaleBanner/GetSaleBanner");
const { postSaleBanner } = require("../controllers/SaleBanner/PostSaleBanner");
const {
	deleteSaleBanner,
} = require("../controllers/SaleBanner/DeleteSaleBanner");

route.get("/", getSaleBanner);
route.post("/", postSaleBanner);
route.delete("/:id", deleteSaleBanner);

module.exports = route;
