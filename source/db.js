require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/e_commerce`,
	{
		logging: false,
		native: false,
	}
);
const basename = path.basename(__filename);
console.log(basename);
const modelDefiners = [];
//se leen todos los archivos de la carpeta Models, y se agregan al arreglo ModelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});
//se inyecta conexion de sequelize a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
//se capitalizam los nombres de todos los modelos
let entries = Object.entries(sequelize.models);
let capEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);

sequelize.models = Object.fromEntries(capEntries);
console.log(sequelize.models);

const {
	Product,
	Category,
	SubCategory,
	ClientAddress,
	Order,
	OrderDetail,
	Review,
	Cart,
	CartItem,
	User,
	UserLoginDetail,
	Wishlist,
	WishlistItem,
	SaleBanner,
} = sequelize.models;

//relaciones entre tablas

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);
CartItem.belongsTo(Product);
Product.hasMany(CartItem);

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);
OrderDetail.belongsTo(Product);
Product.hasMany(OrderDetail);

User.hasOne(UserLoginDetail);
UserLoginDetail.belongsTo(User);

User.hasMany(ClientAddress);
ClientAddress.belongsTo(User);

User.hasOne(Wishlist);
Wishlist.belongsTo(User);
Wishlist.hasMany(WishlistItem);
WishlistItem.belongsTo(Wishlist);
Product.hasMany(WishlistItem);
WishlistItem.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsTo(Category);
Category.hasMany(Product);
Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

Product.belongsTo(SaleBanner);
SaleBanner.hasMany(Product);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
