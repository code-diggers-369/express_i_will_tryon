const async = require('async');
const { Joi } = require('celebrate');

const handleResponse = require('../../helpers/handleResponse');

const Supplier = require('../../schemas/Supplier');

const schema = {
	body: Joi.object({
		users: Joi.array()
			.items(Joi.string()),
	}),
};

const request = async (req, res) => {
	async.auto({
		create: [
			async () => {
				const { body } = req;
				const supplier = new Supplier(body);
				const res = await supplier.save();

				if (res) {
					return {
						message: 'New supplier created',
						company: res,
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 500,
						data: {
							message: 'Internal Server Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
