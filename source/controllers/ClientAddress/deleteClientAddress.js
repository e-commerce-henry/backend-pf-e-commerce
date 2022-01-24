const { User, ClientAddress } = require("../../db");

const deleteClientAddress = async (req, res) => {
	const { id, addressId } = req.params;

	try {
		const userAddress = await ClientAddress.findOne({
			where: {
				id: addressId,
				userId: id,
			},
		});
		if (!userAddress) {
			res.status(404).send("Esa direccion no existe");
		} else {
			await userAddress.destroy();
			res.status(200).send("La direccion ha sido eliminada");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = deleteClientAddress;
