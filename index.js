const app = require("./source/app");
const { conn } = require("./source/db");

const {
	preChargeCategories,
	preChargeProduct,
} = require("./source/controllers/Products/PreCharge");

conn.sync({ force: false }).then(() => {
	app.listen(3001, async () => {
		await preChargeCategories(), await preChargeProduct();
		console.log("server listening on port 3001");
	});
});
