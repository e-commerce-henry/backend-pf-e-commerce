const app = require("./source/app");
const { conn } = require("./source/db");
const preChargeAdmin = require("./source/controllers/Users/preChargeAdmin");
const {
	preChargeCategories,
	preChargeProduct,
} = require("./source/controllers/Products/PreCharge");

conn.sync({ force: false }).then(() => {
	app.listen(3001, async () => {
		await preChargeCategories()
			await preChargeProduct()
			await preChargeAdmin()
		console.log("server listening on port 3001");
	});
});



