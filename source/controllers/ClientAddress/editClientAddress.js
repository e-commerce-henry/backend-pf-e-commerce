const { User, ClientAddress } = require("../../db");

const editClientAddress = async (req, res) => {
	const { address, cp, city, province, floor } = req.body;
	const { id, addressId } = req.params;
	if (!address || !cp || !city || !province) {
		res.status(400).send("Direccion, CP, ciudad y provincia son requeridos");
	} else {
		try {
			const user = await User.findOne({
				where: { id },
				include: { model: ClientAddress },
			});
			const userAddresses = user.clientAddresses;
			const duplicate = userAddresses.filter((e) => e.address === address);
			if (duplicate.length > 0) {
				res.status(400).send("Esa direccion ya esta guardada");
			} else {
				await ClientAddress.update(
					{
						address,
						postalCode: cp,
						city,
						province,
						floor,
					},
					{ where: { id: addressId } }
				);
			}
			res.status(200).send("La direccion ha sido actualizada");
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = editClientAddress;
