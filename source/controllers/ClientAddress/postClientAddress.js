const { User, ClientAddress } = require("../../db");

const addClientAddress = async (req, res) => {
	const { address, cp, city, province, floor } = req.body;
	const { id } = req.params;

	if (!address || !cp || !city || !province) {
		res.status(400).send("Direccion, CP, ciudad y provincia son requeridos");
	} else {
		try {
			const user = await User.findOne({
				where: { id },
				include: { model: ClientAddress },
			});
			console.log(user.clientAddresses);
			const duplicate = user.clientAddresses.filter(
				(e) => e.address === address
			);
			if (duplicate.length > 0) {
				res.status(400).send("Esa direccion ya existe");
			} else {
				await user.createClientAddress({
					address,
					postalCode: cp,
					city,
					province,
					floor,
				});
				res.status(200).send("La nueva direccion ha sido agregada");
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = addClientAddress;
