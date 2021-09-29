const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Product = require('../../schemas/product');

const schema = {
	body: Joi.object({
		name: Joi.string()
			.required(),
		description: Joi.string()
			.required(),
		shortDescriptions: Joi.string()
			.required(),
		slug: Joi.string()
			.required(),
		attributes: [Joi.string()],
		variants: [Joi.string()],
		categories: [Joi.string()],
		quantity: Joi.number(),
		approved: Joi.boolean()
			.default(false),
		published: Joi.boolean()
			.default(false),
		price: Joi.number()
			.required(),
		discountedPrice: Joi.number()
			.required(),
		supplierId: Joi.string()
			.length()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		create: [
			async () => {
				const { body } = req;
				const product = new Product(body);

				const res = product.save();

				if (res) {
					return {
						message: 'New Product Created',
						product: res,
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
