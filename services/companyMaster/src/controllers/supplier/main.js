const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Supplier = require('../../schemas/Supplier');

const schema = { body: Joi.object({}) };

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { supplierId } = req.params;

				const supplier = await Supplier.findOne({ _id: supplierId });

				if (supplier) {
					return {
						message: 'Supplier Found',
						supplier,
					};
				}
				throw new Error(JSON.stringify({
					status: 404,
					data: {
						message: 'No such supplier found',
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
