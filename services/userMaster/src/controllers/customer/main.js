const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Customer = require('../../schemas/Customer');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { customerId } = req.params;

				const customer = await Customer.findOne({ _id: customerId });

				if (customer) {
					return {
						message: 'Customer found',
						customer,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'main',
					body: {
						status: 404,
						data: {
							message: 'No such Customer found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
