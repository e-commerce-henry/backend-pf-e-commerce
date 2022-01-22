require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://epibrglqntdsrn:f3965d01be5ca5fddf854b7554bc8194769eac2b516181202799025f333e9e8b@ec2-3-212-75-25.compute-1.amazonaws.com:5432/dfig8svtavhc2e`,
	{
		logging: false,
		native: false,
	}
);
const basename = path.basename(__filename);
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

User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });
Cart.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { onDelete: "CASCADE" });
CartItem.belongsTo(Product);
Product.hasMany(CartItem);

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);
OrderDetail.belongsTo(Product);
Product.hasMany(OrderDetail);

User.hasOne(UserLoginDetail, { onDelete: "CASCADE" });
UserLoginDetail.belongsTo(User, { onDelete: "CASCADE" });

User.hasOne(ClientAddress, { onDelete: "CASCADE" });
ClientAddress.belongsTo(User, { onDelete: "CASCADE" });

User.hasOne(Wishlist, { onDelete: "CASCADE" });
Wishlist.belongsTo(User, { onDelete: "CASCADE" });
Wishlist.hasMany(WishlistItem, { onDelete: "CASCADE" });
WishlistItem.belongsTo(Wishlist, { onDelete: "CASCADE" });
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

Product.hasMany(SaleBanner);
SaleBanner.belongsTo(Product);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
