const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Variant = require('../../schemas/variant');

const schema = {
	body: Joi.object({
		productId: Joi.string()
			.required(),
		quantity: Joi.number()
			.min(0)
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		create: [
			async () => {
				const { body } = req;
				const variant = new Variant(body);

				const res = variant.save();

				if (res) {
					return {
						message: 'New Variant Created',
						variant: res,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'create',
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
